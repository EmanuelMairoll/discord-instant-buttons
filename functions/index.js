const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp();

const Discord = require('discord.js')

const ytdl = require('ytdl-core')

exports.runBotOnSetActive = functions
    .region('europe-west1')
    .database.ref("/buttons/{button}")
    .onUpdate(async (snapshot) => {
        const button = snapshot.after.val()
        const client = new Discord.Client()

        if (!button.activeChannel) return

        const streamPromise = new Promise(resolve => {
            const stream = ytdl(button.link)
            stream.on('readable', resolve(stream))
        })

        const {token} = require("./token.json")
        await client.login(token)
        const channelPromise = client.channels.fetch(button.activeChannel);
        const connectionPromise = channelPromise.then(channel => channel.join())

        return Promise.all([streamPromise, connectionPromise]).then(async values => {
            return new Promise(resolve => {
                const [audio, connection] = values
                const dispatcher = connection.play(audio)

                const timeoutId = setTimeout(() => dispatcher.emit("finish"), 30000)

                dispatcher.on("finish", () => {
                    clearTimeout(timeoutId)

                    connection.channel.leave()
                    dispatcher.destroy()

                    const disableAfterPlayingPromise = snapshot.after.ref.child("activeChannel").remove()
                    resolve(disableAfterPlayingPromise)
                })

                snapshot.after.ref.on("value", newSnapshot => {
                    if (!newSnapshot.val().activeChannel) {
                        clearTimeout(timeoutId)

                        connection.channel.leave()
                        dispatcher.destroy()

                        resolve()
                    }
                })
            })
        })
    })
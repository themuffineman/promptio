import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from '@utils/database'
import User from '@models/user'

const handler = NextAuth({
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    async session({session}){
        const sessionUser = await User.findOne({email:session.user.email})

        session.User.id = sessionUser._id.toString()

        return session
    },
    async signIn({profile}){
        try {
            await connectToDB()

            const userExists = await User.findOne({
                email: profile.email
            })

            if(!userExists){
                await User.create({
                    email: profile.email,
                    name: profile.name.replace("","").
                    toLowerCase(),
                    image: profile.picture

                })
            }
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

})

export {handler as Get, handler as Post}
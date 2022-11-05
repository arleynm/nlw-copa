import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

async function main(){
    const user = await prisma.user.create({
        data:{
            name:'Arley Augusto',
            email:'arleyaugusto1@gmail.com',
            avatarUrl: 'https://github.com/arleynm.png'
            
        }
    });

    const pool = await prisma.pool.create({
        data:{
            title: 'Pool copa',
            code: 'POOL12', 
            ownerId: user.id,
            
            participants:{
                create:{
                    userId:user.id
                }
            }
        }
    })


    await prisma.game.create({
        data:{
            date:'2022-11-05T12:00:00.393Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    });

    await prisma.game.create({
        data:{
            date:'2022-11-03T12:00:00.393Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses:{
                create:{
                    firstTeamPoints:2,
                    secondTeamPoints:1,

                    participants:{
                        connect:{
                            userId_poolId:{
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }

    });
}

main()
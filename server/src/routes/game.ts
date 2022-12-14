import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

import { authenticate } from '../plugins/authenticate'

export async function gameRoutes(fastify: FastifyInstance) {
	fastify.get('/pools/:id/games', {
		onRequest: [authenticate]
	}, async (request) => {
		const getPollParams = z.object({
			id: z.string()
		})

		const { id } = getPollParams.parse(request.params)

		const games = await prisma.game.findMany({
			orderBy: {
				date: 'desc'
			},
			include: {
				guesses: {
					where: {
						participants: {
							userId: request.user.sub,
							poolId: id
						}
					}
				}
			}
		})

		return { 
			games: games.map(game => ({
				...game,
				guess: game.guesses.length ? game.guesses[0] : null,
				guesses: undefined
			}))
		}
	})
}
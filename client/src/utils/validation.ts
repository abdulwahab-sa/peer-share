import { z } from 'zod';

export const IceCandidateSchema = z.object({
	candidate: z.string(),
	sdpMid: z.string().optional(),
	sdpMLineIndex: z.number().optional(),
});

export const SdpSchema = z.object({
	target: z.string().min(1),
	caller: z.string().min(1),
	sdp: z.object({
		type: z.enum(['offer', 'answer']),
		sdp: z.string().min(1),
	}),
});

/**
 * Next.js Middleware
 *
 * Middleware runs on the Edge Runtime, so it must not import Node-only modules.
 * Keep this file Edge-safe to avoid bundling database drivers (pg).
 */
import { NextResponse } from "next/server";

export function middleware() {
	return NextResponse.next();
}

import { NextRequest, NextResponse } from 'next/server';

const USER = process.env.BASIC_AUTH_USER || 'aibp';
const PASS = process.env.BASIC_AUTH_PASS || 'aibp';

export function middleware(req: NextRequest) {
  if (process.env.PREVIEW_BYPASS === '1') return NextResponse.next();
  const auth = req.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme === 'Basic' && encoded) {
      const decoded = Buffer.from(encoded, 'base64').toString();
      const idx = decoded.indexOf(':');
      const user = decoded.slice(0, idx);
      const pass = decoded.slice(idx + 1);
      if (user === USER && pass === PASS) {
        return NextResponse.next();
      }
    }
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="AIBP CI & PATTERN INTELLIGENCE"' },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};


export async function initSessionToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/token/generate`, {
    method: 'POST',
  });
  const data = await res.json();
  return data.token;
}

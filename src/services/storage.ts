// Uni helper do generowania signed URL dla prywatnego bucketa
import { supabase } from '@/api/supabase'

export async function signImage(path?: string, expiresIn = 3600): Promise<string | null> {
  if (!path) return null
  if (path.startsWith('http')) return path

  const { data, error } = await supabase
    .storage
    .from('product-images')
    .createSignedUrl(path, expiresIn)

  if (error || !data?.signedUrl) return null
  return data.signedUrl
}

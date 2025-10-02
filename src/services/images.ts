import { supabase } from "@/api/supabase"

export async function getSignUrlMany(paths: string[], BUCKET: string, expiresIn = 60 *60 ) {
  if(paths.length === 0) return []

  const {data, error} = await supabase
    .storage
    .from(BUCKET)
    .createSignedUrls(paths, expiresIn)

    if(error) throw error

    return data?.map(d => d?.signedUrl ?? null) ?? []
}
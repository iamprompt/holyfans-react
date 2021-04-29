const storageBaseUrl = `https://firebasestorage.googleapis.com/v0/b/mu-nakama.appspot.com/o/`

export const HolyfansStorage = {
  getUrl: (filePath: string) =>
    `${storageBaseUrl}${encodeURIComponent(`holyfans/`)}${encodeURIComponent(
      filePath
    )}?alt=media`,
}

const MY_LIST_KEY = "handyflix_my_list"

export function getMyList(): string[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(MY_LIST_KEY)
  return stored ? JSON.parse(stored) : []
}

export function addToMyList(id: string | number): string[] {
  const stringId = String(id)
  const list = getMyList()
  if (!list.includes(stringId)) {
    const updated = [...list, stringId]
    localStorage.setItem(MY_LIST_KEY, JSON.stringify(updated))
    return updated
  }
  return list
}

export function removeFromMyList(id: string | number): string[] {
  const stringId = String(id)
  const list = getMyList()
  const updated = list.filter((itemId) => itemId !== stringId)
  localStorage.setItem(MY_LIST_KEY, JSON.stringify(updated))
  return updated
}

export function isInMyList(id: string | number): boolean {
  return getMyList().includes(String(id))
}

export function toggleMyList(id: string | number): { isInList: boolean; list: string[] } {
  if (isInMyList(id)) {
    return { isInList: false, list: removeFromMyList(id) }
  }
  return { isInList: true, list: addToMyList(id) }
}

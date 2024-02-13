const INFO_KEY = 'userInfo'
const HISTORY_KEY = 'searchHistory'

// 个人信息
export const getInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

// 搜索历史记录
export const getHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}

export const setHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}

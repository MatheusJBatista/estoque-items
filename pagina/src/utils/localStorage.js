export const setAuth = () => localStorage.setItem('authUser', true)

export const getAuth = () => localStorage.getItem('authUser')

export const removeAuth = () => localStorage.removeItem('authUser')

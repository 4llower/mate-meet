import React, { useContext, useState } from 'react'

interface Values {
  token: string
}

interface Actions {
  setToken: (value: string) => void
}

const TokenContext = React.createContext<Values & Actions>({} as Values & Actions)

export const useToken = () => {
  const context = useContext(TokenContext)
  if (!context) throw new Error('[useToken] outside')
  return context
}

export const TokenProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string>('')
  return <TokenContext.Provider value={{ token, setToken }}>{children}</TokenContext.Provider>
}

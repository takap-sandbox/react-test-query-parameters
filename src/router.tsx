import { useRoutes } from "react-router-dom"
import App from "./App"

export const Routes = () => {
  const element = useRoutes([
    {
      path: '/',
      element: <App />
    },
  ])
  return <>{element}</>
}
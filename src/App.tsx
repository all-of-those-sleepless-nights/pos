import { RouterProvider } from "react-router-dom"

import { router } from "./components/routes/router"
import { AlertProvider } from "./lib/alert-context"

function App() {
  return (
    <AlertProvider>
      <RouterProvider router={router} />
    </AlertProvider>
  )
}

export default App

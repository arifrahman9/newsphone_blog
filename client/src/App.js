import "./App.css"
import React, { useEffect } from "react"
import { Switch, Route } from "react-router-dom"
import Homepage from "./pages/Homepage"
import DetailPage from "./pages/Detail"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import AddNew from "./pages/AddNewBlog"
import EditPage from "./pages/EditPage"
import { useDispatch, useSelector } from "react-redux"
import { getOneUser } from "./store/action"

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state)
  console.log(user, "from app")
  useEffect(() => {
    dispatch(getOneUser())
  }, [])
  return (
    <Switch>
      <Route path="/blogs/:id">
        <DetailPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/Register">
        <RegisterPage />
      </Route>
      <Route path="/addNew">
        <AddNew />
      </Route>
      <Route path="/edit/:id">
        <EditPage />
      </Route>
      <Route path="/" exact>
        <Homepage />
      </Route>
    </Switch>
  )
}

export default App

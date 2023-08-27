import './index.css'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const Login = props => {
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const onSuccessLogin = jwtTToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtTToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  const onSubmitFailure = Msg => {
    console.log(Msg)
  }

  const onClickLogin = async () => {
    const userDetails = {username: 'rahul', password: 'rahul@2021'}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSuccessLogin(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  return (
    <>
      <h1 className="login-heading">Please Login</h1>
      <button type="button" className="btn" onClick={onClickLogin}>
        Login With Sample Creds
      </button>
    </>
  )
}
export default Login

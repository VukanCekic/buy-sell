import { container } from 'tsyringe'
import type { APIGatewayProxyEventV2 } from 'aws-lambda'
import { UserService } from '../service/userService'
import { ErrorResponse } from '../utility/response'
import middy from '@middy/core'
import bodyParser from '@middy/http-json-body-parser'

const service = container.resolve(UserService)

export const Signup = middy(async (event: APIGatewayProxyEventV2) => {
  return await service.CreateUser(event)
}).use(bodyParser())

export const Login = middy(async (event: APIGatewayProxyEventV2) => {
  return await service.UserLogin(event)
}).use(bodyParser())

export const Verify = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase()
  if (httpMethod === 'post') {
    return await service.VerifyUser(event)
  } else if (httpMethod === 'get') {
    return await service.GetVerificationToken(event)
  } else {
    return ErrorResponse(404, 'requested method is not supported!')
  }
}

export const Profile = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase()
  if (httpMethod === 'post') {
    return await service.CreateProfile(event)
  } else if (httpMethod === 'put') {
    return await service.EditProfile(event)
  } else if (httpMethod === 'get') {
    return await service.GetProfile(event)
  } else {
    return ErrorResponse(404, 'requested method is not supported!')
  }
}

export const Cart = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase()
  if (httpMethod === 'post') {
    return await service.CreateCart(event)
  } else if (httpMethod === 'put') {
    return await service.UpdateCart(event)
  } else if (httpMethod === 'get') {
    return await service.GetCart(event)
  } else {
    return ErrorResponse(404, 'requested method is not supported!')
  }
}

export const Payment = async (event: APIGatewayProxyEventV2) => {
  const httpMethod = event.requestContext.http.method.toLowerCase()
  if (httpMethod === 'post') {
    return await service.CreatePaymentMethod(event)
  } else if (httpMethod === 'put') {
    return await service.UpdatePaymentMethod(event)
  } else if (httpMethod === 'get') {
    return await service.GetPaymentMethod(event)
  } else {
    return ErrorResponse(404, 'requested method is not supported!')
  }
}

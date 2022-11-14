# Sign Up

## Request

### Route

```js
POST /auth/sign-up
```

### Request Body

```json
{
    "email": "email@com.br",
    "password": "password",
    "username": "username",
    "pictureUrl": "http://picture.jpg"
}
```

## Response

### Response Status

1. Success - created a new account for the user

    ```js
    201 - Created
    ```

2. Fail - there is already an account using the provided email and/or username

    ```js
    409 - Conflict
    ```

3. Fail - invalid request body

    ```js
    422 - Conflict
    ```

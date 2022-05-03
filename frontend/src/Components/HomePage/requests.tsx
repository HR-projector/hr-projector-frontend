export async function login(email:string,password:string) {
    let body = {
        jsonrpc: "2.0",
        id: 0,
        method: "login",
        params: {
            credentials: {
                email: email,
                password: password
            }
        }
    }

    let response = await fetch('http://localhost:8000/api/v1/auth/jsonrpc/login', {
        method: 'POST',
        body: JSON.stringify(body)
    });
    response.json().then(res => {
        if (res.hasOwnProperty("error")) {
            alert(`Ошибка ${res.error.code}, авторизация не произведена, проверьте логин и пароль`)
        }
        else {
            alert(`Авторизация пройдена`);
            console.log(res.result.token)
            localStorage.setItem("token",res.result.token)
        }
    })

}

export async function register(email:string,password:string,password_confirmation:string,
                        first_name:string,last_name:string,patronymic:string) {
    let body = {
        jsonrpc: "2.0",
        id: 0,
        method: "register",
        params: {
            user_data: {
                email: email,
                password: password,
                password_confirmation: password_confirmation,
                first_name: first_name,
                last_name: last_name,
                patronymic: patronymic,
                department_id: 1
            }
        }
    }

    let response = await fetch('http://localhost:8000/api/v1/auth/jsonrpc/register', {
        method: 'POST',
        body: JSON.stringify(body)
    });
    response.json().then(res => {
        if (res.hasOwnProperty("error")) {
            if (res.error.code === 1001) {
                alert(`Ошибка ${res.error.code}, Пользователь уже сущетсвует`)
            }
            else if (res.error.code === 2001) {
                alert(`Ошибка ${res.error.code}, Департамент не найден`)
            }
        }
        else {
            alert(`Регистрация прошла успешно`)
        }
    })
}
import error from '../../resources/img/error.gif'

const ErrorMessage = () => {
    return (
        <img src={error} alt="Error" style={{
            width: "200px",
            height: "200px",
            display: "block",
            margin: "0 auto",
            objectFit: "contain"
        }} />
    )
}

export default ErrorMessage
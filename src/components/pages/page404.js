import ErrorMessage from "../errorMessage/ErrorMessage"

const Page404 = () => {
    return (
        <>
            <ErrorMessage />
            <p style={{ 'textAlign': 'center', 'fontWeight': 'bold', 'fontSize': '24px' }}>Page doesn't exist</p>
        </>
    )
}

export default Page404
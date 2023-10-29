export interface FormikErrorInterface {
    keyName: string,
    formik: any
}
const FormikError = ({ keyName, formik }: any) => {
    return (
        <>
            {formik.touched[keyName] && formik.errors[keyName] && (
                <div style={{ color: 'red' }}>{formik.errors[keyName]}</div>
            )}
        </>
    )
}
export default FormikError;
interface CustomError {
    statusCode?: number;
    name?: string;
    code?: number;
    errors?: any;
    keyValue?: any;
}

export default CustomError;
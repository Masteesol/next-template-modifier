const checkEnv = () => {
    const devUrl = process.env.NEXT_PUBLIC_DEV_BASE_URL as string;
    const prodUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
    return process.env.NEXT_PUBLIC_API_ENV === 'development' ? devUrl : prodUrl
}

export default checkEnv
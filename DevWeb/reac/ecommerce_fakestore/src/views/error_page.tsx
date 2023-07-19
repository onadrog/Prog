import { useRouteError } from "react-router-dom";

type ErrType = {
    statusText?: string
    message: string
}

export function ErrorPage() {
    const err = useRouteError() as ErrType;
    console.error(err);
    return (<>
        <h1>Something went wrong.</h1>
        <p>
            <i>{err.statusText || err.message}</i>
        </p>
    </>);
};

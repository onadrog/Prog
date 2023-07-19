import { useContext } from "react";
import { Ctx } from "./App";

export function useWorker() {
	/** @type {Worker}   */
	const { worker } = useContext(Ctx);
}

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { ENUM_TYPE } from "./worker";

function initWorker() {
	return new Worker(new URL("./worker.js", import.meta.url), {
		type: "module",
	});
}

export const Ctx = createContext({});

export function WorkerCtx({ children }) {
	const workerRef = useRef(initWorker());
	const [workerMsg, setWorkerMsg] = useState(null);

	const sendMsg = useCallback(
		function (msg, type) {
			let data = msg;

			if (typeof msg !== "string") {
				data = JSON.stringify(msg);
			}
			const encoder = new TextEncoder();
			const buffer = encoder.encode(data);
			const b = new Uint8Array(buffer.byteLength + 2);
			b.set(buffer);
			b[b.byteLength - 1] = type;
			if (msg) {
				b[b.byteLength - 2] = msg.id;
			}

			workerRef.current.postMessage(b, [b.buffer]);
			workerRef.current.onmessage = function (e) {
				setWorkerMsg(e.data);
			};
		},
		[workerRef],
	);

	const defaultCtx = {
		current: {
			worker: workerRef.current,
			sendData: sendMsg,
			response: workerMsg,
		},
	};

	useEffect(
		function () {
			defaultCtx.current.sendData({}, ENUM_TYPE.GETALL);
			defaultCtx.current.worker.onmessage = (e) => {
				console.log("msg", e);
			};
		},
		[defaultCtx],
	);
	return <Ctx.Provider value={defaultCtx.current}>{children}</Ctx.Provider>;
}

function App() {
	const { sendData, response, worker } = useContext(Ctx);
	let msg = undefined;
	if (response) {
		msg = new TextDecoder().decode(response);
	}

	return (
		<div>
			<button
				type="button"
				onClick={() =>
					sendData(
						{ id: Math.floor(Math.random() * 56), foo: "bar" },
						ENUM_TYPE.PUT,
					)
				}
			>
				SendMsg
			</button>
			<button
				type="button"
				onClick={() =>
					sendData(
						{ id: Math.floor(Math.random() * 56), foo: "bar" },
						ENUM_TYPE.GETALL,
					)
				}
			>
				getMsg
			</button>
			{msg && msg}
		</div>
	);
}

export default App;

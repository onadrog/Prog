export class Idb {
	/** @type {IDBDatabase} */
	#db;
	/** @type {IDBOpenDBRequest} */
	#dbReq;
	/** @type {IDBObjectStoreParameters} */
	dbStoreOptions;
	/** @type {string} */
	name;
	/** @type {string} */
	#storeName;
	/** @type {number} */
	ver;
	constructor(
		name = "db",
		ver = 1,
		storeName = "db_store",
		dbStoreOptions = {},
	) {
		this.name = name;
		this.#storeName = storeName;
		this.ver = ver;
		this.dbStoreOptions = dbStoreOptions;
		this.#init();
	}
	#init() {
		this.#dbReq = indexedDB.open(this.name, this.ver);
		this.#dbReq.onerror = (_) => {
			throw new Error(`Error: could not load database ${this.dbName}`);
		};
		this.#dbReq.onsuccess = ({ target }) => {
			this.#db = target.result;
		};
		this.#dbReq.onupgradeneeded = ({ target }) => {
			this.#db = target.result;
			this.#db.createObjectStore(this.#storeName, this.dbStoreOptions);
		};
	}

	/** @param {IDBTransactionMode} [readwrite] mode
	 * @returns {IDBObjectStore}
	 *
	 */
	async #getObjectStore(mode = "readwrite") {
		if (this.#db === undefined) {
			const tmp = await new Promise((resolve) => {
				this.#dbReq.onsuccess = (e) => {
					resolve(e.target.result);
				};
			});
			this.#db = tmp;
		}
		const transaction = this.#db.transaction(this.#storeName, mode);
		return transaction.objectStore(this.#storeName);
	}

	/**
	 * @param {IDBRequest} req
	 * @returns {Promise}
	 */
	#getPromise(req) {
		return new Promise((resolve, reject) => {
			req.onsuccess = ({ target }) => resolve(target);
			req.onerror = () => reject(req.error);
		});
	}

	/**
	 * @param {IDBValidKey | IDBKeyRange} query
	 * @returns {Promise}
	 */
	async getData(query) {
		const store = this.#getObjectStore("readOnly");
		const storeData = store.get(query);

		try {
			return await this.#getPromise(storeData);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @returns {Promise}
	 */
	async getAllData() {
		const store = await this.#getObjectStore("readonly");
		const a = await store.getAll();

		console.log("O", this.#getPromise(a));
		// const storeData = store.getAll();
		try {
			return await this.#getPromise(a);
		} catch (e) {
			console.error(e);
		}
	}

	/**
	 * @param {unknown} data
	 * @param {IDBValidKey | undefined} key
	 */
	putData(data, key) {
		const store = this.#getObjectStore();
		store.put(data, key);
	}
}

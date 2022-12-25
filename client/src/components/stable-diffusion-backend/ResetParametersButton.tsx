import { useStore } from "@nanostores/react";
import { generateLoadingStore } from "./store";

export default function ResetParametersButton() {
    const $generateLoading = useStore(generateLoadingStore);

    return (
        <button type="button" disabled={$generateLoading} className="inline-block px-4 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out">
            Reset parameters
        </button>
    )
}
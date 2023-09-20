export default function FlashMessage({ message, type }) {
    return (
        <div
            className={`flex bg-green-100 rounded p-4 mb-4 text-sm text-green-700 ${type}`}
        >
            {message}
        </div>
    );
}

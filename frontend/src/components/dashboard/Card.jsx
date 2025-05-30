
const Card = ({ label, value}) => {
    return <div className="rounded-lg bg-[#1f2536] text-white p-10">
        <p>{label}</p>
        <h1 className="font-bold text-3xl mt-4">{value}</h1>
    </div>
}

export default Card
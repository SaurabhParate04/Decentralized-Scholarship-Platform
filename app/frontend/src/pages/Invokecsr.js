import React, { useEffect, useState } from 'react'

export default function Invokecsr() {

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const [args, setArgs] = useState({
        company: '',
        address: '',
        amount: '',
        user: '',
    })

	const [func, setFunc] = useState('')
    const [usertype, setUsertype] = useState('')
    const [channel, setChannel] = useState('')

    const onChangeArgs = async (e) => {
        setArgs({
            ...args, [e.target.name]: e.target.value
        })
    }

    const onSubmitArgs = async (e) => {
        e.preventDefault();
        try {
            const now = String(new Date())
            const transactionId = 'TRNSCTC' + now.substring(8,10) + now.substring(11,15) + now.substring(16,18) + now.substring(19,21) + now.substring(22,24)
            const obj = `--obj.transactionId=${transactionId} --obj.company=${(args.company).replace(/ /g,"_")} --obj.address=${(args.address).replace(/ /g,"_")} --obj.amount=${args.amount} --obj.timestamp='"${now.replace(/ /g,"_")}"'`
            invoke(transactionId, obj)
        } catch (error) {
            console.error(error.message)
        }
    }

    const invoke = async(transactionId, obj) => {
        try {
            const url = "http://localhost:5000/api/blockchain/invoke"
            await fetch(url, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'user': args.user,
                    'func': func,
                    'transactionId': transactionId,
                    'obj': obj,
                    'usertype': usertype,
                    'channel': channel,
                }
            });
        } catch(error) {
            console.log(error)
        }
    }

	const functionHandler = (e) => {
        setFunc(e.target.value)
    }

    const usertypeHandler = (e) => {
        setUsertype(e.target.value)
    }

    const channelHandler = (e) => {
        setChannel(e.target.value)
    }

    return (
        <>
            <div className='overlay'>
                <div className="cf-container_det">
					<div className="cf-title">Pass Arguments</div>
					<div className="cf-content">
						<form onSubmit={onSubmitArgs} onChange={onChangeArgs}>
							<div className="user-details">
								<div className="input-box" style={{ width: "100%" }}>
									<span className="details">Company Name</span>
									<input type="text" name="companyName" placeholder="Enter Company Name" required />
								</div>
								<div className="input-box" style={{ width: "100%" }}>
									<span className="details">Company Address</span>
									<input type="text" name="companyAddress" placeholder="Enter Company Address" required />
								</div>
								<div className="input-box" style={{ width: "100%" }}>
									<span className="details">Amount</span>
									<input type="number" name="amount" placeholder="Enter the amount" required />
								</div>
                                <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Username</span>
									<input type="text" name="username" placeholder="Enter Username" required />
								</div>
                                <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Usertype</span>
									<div className="select">
										<select className="form-select select-box select-wrapper" name="usertype" onChange={usertypeHandler} required>
											<option value="Company1">Company 1</option>
											<option value="Company2">Company 2</option>
										</select>
									</div>
								</div>
                                <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Channel</span>
									<div className="select">
										<select className="form-select select-box select-wrapper" name="channel" onChange={channelHandler} required>
											<option value="mychannel">Channel 1</option>
											<option value="channel2">Channel 2</option>
										</select>
									</div>
								</div>
                                <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Function</span>
									<div className="select">
										<select className="form-select select-box select-wrapper" name="func" onChange={functionHandler} required>
											<option value="createTransaction">Create</option>
											<option value="queryTransaction">Query</option>
											<option value="queryAllTransactions">QueryAll</option>
										</select>
									</div>
								</div>
							</div>
							<div className="button">
								<input type="submit"/>
							</div>
						</form>
					</div>
                </div>
            </div>
        </>
    )
}
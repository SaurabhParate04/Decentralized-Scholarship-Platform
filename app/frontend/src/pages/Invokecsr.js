import React, { useEffect, useState } from 'react'

export default function Invokecsr() {

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const [args, setArgs] = useState({
        amount: '',
    })

    const [user, setUser] = useState('')
	const [func, setFunc] = useState('createTransaction')
    const [usertype, setUsertype] = useState('Company1')
    const [channel, setChannel] = useState('')
    const [address, setAddress] = useState('')

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
            const obj = `--obj.transactionId=${transactionId} --obj.company=${(usertype).replace(/ /g,"_")} --obj.address=${(address).replace(/ /g,"_")} --obj.amount=${args.amount} --obj.timestamp='"${now.replace(/ /g,"_")}"'`
            invoke(transactionId, obj)
        } catch (error) {
            console.error(error.message)
        }
    }

    const invoke = async(transactionId, obj) => {
        try {
            const url = "http://localhost:5000/api/blockchain/invoke"
            console.log(usertype)
            await fetch(url, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'user': user,
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

    const userHandler = (e) => {
        setUser(e.target.value)
    }

    const usertypeHandler = (e) => {
        const t = e.target.value
        setUsertype(t)
        if(t === 'Company1') {
            setChannel('mychannel')
            setAddress('Company 1, Street 1, Some Area, 145698')
        } else if(t === 'Company2') {
            setChannel('channel2')
            setAddress('Company 2, Street 2, Somewhere Else, 789456')
        }
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
									<span className="details">Function</span>
									<div className="select">
										<select className="form-select select-box select-wrapper" name="func" onChange={functionHandler} required>
											<option value="createTransaction">Create</option>
											<option value="queryTransaction">Query</option>
											<option value="queryAllTransactions">QueryAll</option>
										</select>
									</div>
								</div>
                                {
                                func === 'createTransaction' && <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Company</span>
									<div className="select">
										<select className="form-select select-box select-wrapper" name="usertype" onChange={usertypeHandler} required>
											<option value="Company1">Company 1</option>
											<option value="Company2">Company 2</option>
										</select>
									</div>
								</div>
                                }
								{
                                func === 'createTransaction' && <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Amount</span>
									<input type="number" name="amount" placeholder="Enter the amount" required />
								</div>
                                }
                                {
                                func === 'createTransaction' && <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Username</span>
									<input type="text" name="username" placeholder="Enter Username" onChange={userHandler} required />
								</div>
                                }
                                {
                                func === 'queryTransaction' && <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Transaction ID</span>
									<input type="text" name="transactionid" placeholder="Enter TransactionId" required />
								</div>
                                }
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
import React, { useEffect, useState } from 'react'

export default function Enroll() {

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [])

    const [usertype, setUsertype] = useState('Company1')

    const onSubmitArgs = async (e) => {
        e.preventDefault();
        try {
            enroll()
        } catch (error) {
            console.error(error.message)
        }
    }

    const enroll = async() => {
        try {
            const url = "http://localhost:5000/api/blockchain/enrolladmin"
            await fetch(url, {
                method: 'GET', 
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'usertype': usertype
                }
            });
        } catch(error) {
            console.log(error)
        }
    }

    const usertypeHandler = (e) => {
        setUsertype(e.target.value)
    }

    return (
        <>
            <div className='overlay'>
                <div className="cf-container_det">
					<div className="cf-title">Pass Arguments</div>
					<div className="cf-content">
						<form onSubmit={onSubmitArgs}>
							<div className="user-details">
                                <div className="input-box" style={{ width: "100%" }}>
									<span className="details">Usertype</span>
									<div className="select">
										<select className="form-select select-box select-wrapper" name="usertype" onChange={usertypeHandler} required>
											<option value="Company1">Company 1</option>
											<option value="Company2">Company 2</option>
                                            <option value="Portal">Portal</option>
                                            <option value="Student">Student</option>
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
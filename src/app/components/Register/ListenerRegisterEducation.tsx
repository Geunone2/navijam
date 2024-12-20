"use client"
import React, {useEffect} from 'react';
import {useMobile, useTabletHeight} from "@/service/MediaQuery";


export default function ListenerRegisterEducation({educationField, setEducationField}) {

    const isTabletHeight = useTabletHeight();

    useEffect(() => {
        if (educationField.length === 0) {
            setEducationField([""]);
        }
    }, [educationField, setEducationField]);


    const addEducationField = () => {
        setEducationField([...educationField, ""]);
    }

    const removeEducationField = (index) => {
        setEducationField(educationField.filter((_, i) => i !== index))
    }

    const handleChange = (index, value) => {
        const updatedField = [...educationField];
        updatedField[index] = value;
        setEducationField(updatedField);
    }

    return (
        <>
            {/* 경력 label과 입력 필드들 */}
            <div className='flex items-center'>
                <label htmlFor='education'
                       className={` ${isTabletHeight ? 'text-2xl' : 'text-3xl'}  font-semibold w-40 text-wrap`}>학력<span
                    className="text-red-500">*</span></label>

                <div className='flex flex-col w-full'>
                    <div className=' flex flex-col gap-6 w-full'>
                        {educationField.map((field, index) => (
                            <div key={index} className='flex'>
                                <input
                                    id={`education-${index}`}
                                    pattern="^[\s\w\d가-힣]{1,30}$"
                                    className={`block border border-yellow-6 p-5 w-full rounded ${isTabletHeight ? ' placeholder:text-lg text-xl':' placeholder:text-xl text-2xl'} `}
                                    type="text"
                                    value={field}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder="학력을 입력해주세요"
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeEducationField(index)}
                                        className='-mx-6 font-bold text-gray-500'
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    {/* 학력 추가 버튼 */}
                    <div
                        className=' border mt-4 border-dotted p-1 w-fit rounded-lg border-gray-500 text-xl text-gray-500 cursor-pointer'
                        onClick={addEducationField}
                    >
                        + 학력 추가
                    </div>
                </div>
            </div>
        </>
    );
}
'use client'
import React, {useEffect, useState} from 'react';
import CommunityDetail from "@/app/components/community/CommunityDetail";
import {useMobile} from "@/service/MediaQuery";
import CommunityListDetail from "@/app/components/community/CommunityListDetail";
import {useParams} from "next/navigation";

export default function CommunityDetailPage() {
    const isMobile = useMobile();

    return (
        <>
            <div className='flex flex-col text-center'><h1
                className={`font-bold mt-8 ${isMobile ? 'text-5xl' : 'text-7xl'}`}>커뮤니티</h1>
                {isMobile ? (
                    <span className='mt-4 text-2xl'>어떤 고민이든 안전하게 공유할 수 있는 공간입니다. <br/>  편안하게 이야기해 주세요</span>) : (
                    <span className='mt-4 text-3xl'>어떤 고민이든 안전하게 공유할 수 있는 공간입니다. 편안하게 이야기해 주세요</span>)}
            </div>
            <CommunityDetail/>
        </>);
}
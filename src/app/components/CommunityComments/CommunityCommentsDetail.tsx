'use client'
import React, {useEffect, useState} from 'react';
import CommunityCommentsList, {
    CommunityCommentsDetailProps
} from "@/app/components/CommunityComments/CommunityCommentsList";
import {useTabletHeight} from "@/service/MediaQuery";
import {getCookie} from "cookies-next";
import Image from 'next/image'
import Swal from "sweetalert2";
import {useRouter} from "next/navigation";
import {IoMdClose} from "react-icons/io";
import Link from "next/link";

export default function CommunityCommentsDetail({communityId}: CommunityCommentsDetailProps) {

    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
    const isTabletHeight = useTabletHeight();
    const router = useRouter();
    const [comments, setComments] = useState<CommunityCommentsDetailProps[]>([]);
    const nickname = getCookie('nickname');

    useEffect(() => {
        const userName = getCookie("nickname");
        if (userName) {
            setLoggedInUser(userName.toString());
        }

        const fetchComments = async () => {
            if (communityId) {
                try {
                    const data = await CommunityCommentsList(communityId);
                    setComments(data || []);
                } catch (err) {
                    console.error('댓글을 불러오는 데 실패했습니다.');
                }
            }
        };
        fetchComments();
    }, [communityId]);

    const handleDeleteClick = (commentId) => {
        const token = getCookie('accessToken');

        try {
            Swal.fire({
                title: "커뮤니티 댓글 삭제",
                text: "정말로 삭제하시겠습니까?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "삭제",
                confirmButtonColor: "#FAAD00",
                cancelButtonText: "취소",
                cancelButtonColor: "#FF0000",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await fetch(`${process.env["NEXT_PUBLIC_BACKEND_SERVER"]}/community/${commentId}/comments`, {
                        method: 'DELETE',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({commentId}), // 정확히 commentId 전달
                    });

                    if (res.ok) {
                        Swal.fire({title: "삭제 완료!", text: "삭제되었습니다.", icon: "success", timer: 1000});
                        setComments(prevComments => prevComments.filter(comment => comment.id !== commentId)); // 삭제된 댓글 제외
                        window.location.reload();
                    } else {
                        Swal.fire({title: "댓글 삭제에 실패하였습니다.", text: "다시 시도해주세요.", icon: "error", timer: 1000});
                    }
                }
            });
        } catch (err) {
            console.error("삭제 요청 중 오류 발생", err);
        }
    };

    return (
        <>
            {isTabletHeight ? (
                <div className='mt-8 flex flex-col gap-10 mb-10'>
                    <h1 className='text-5xl mb-4'>댓글 <span className='text-yellow-6'>{comments.length}</span>개가 달렸어요.
                    </h1>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className='border-2 rounded-3xl min-h-[200px] p-2 border-gray-400'>
                                <div className='flex flex-row justify-between mx-2 text-center items-center'>
                                    <div className='flex flex-row gap-2 items-center text-center'>
                                        <p className='text-3xl'>{comment.nickname}</p>
                                        {nickname === comment.nickname ? (<>
                                            <Link href='/mypage'>
                                                <Image
                                                    src={comment.profile}
                                                    alt="Profile Image"
                                                    width={30}
                                                    height={30}
                                                    className='mt-1 rounded-full object-cover w-[45px] h-[45px]'
                                                />
                                            </Link>
                                        </>) : (<>
                                            <Image
                                                src={comment.profile}
                                                alt="Profile Image"
                                                width={30}
                                                height={30}
                                                className='mt-1 rounded-full object-cover w-[45px] h-[45px]'
                                            />
                                        </>)}
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <p className='text-2xl -mt-0.5'>{comment.timestamp}</p>
                                    </div>
                                </div>
                                <p className='text-3xl leading-normal whitespace-pre-wrap mt-8 mx-2'>{comment.content}</p>
                                {loggedInUser === comment.nickname && (<div className='text-3xl border-2 w-[80px] border-gray-400 text-gray-500 text-center p-1 ml-auto rounded-xl' onClick={() => handleDeleteClick(comment.id)}>삭제</div>)}
                            </div>
                        ))
                    ) : (
                        <p className="text-3xl">댓글이 없습니다.</p>
                    )}
                </div>
            ) : (
                <div className='mt-8 flex flex-col gap-10 mb-10'>
                    <h1 className='text-5xl mb-4'>댓글 <span className='text-yellow-6'>{comments.length}</span>개가 달렸어요.
                    </h1>
                    {comments.length > 0 ? (
                        comments.map(comment => (
                            <div key={comment.id} className='border-2 rounded-3xl h-auto p-2 border-gray-400'>
                                <div className='flex flex-row justify-between mx-2 text-center items-center'>
                                    <div className='flex flex-row gap-2 items-center text-center'>
                                        <p className='text-4xl'>{comment.nickname}</p>
                                        {nickname === comment.nickname ? (<><Link href='/mypage'>
                                            <Image
                                                src={comment.profile}
                                                alt="Profile Image"
                                                width={30}
                                                height={30}
                                                className='mt-1 rounded-full object-cover w-[60px] h-[60px]'
                                            />
                                        </Link></>) : (<>
                                            <Image
                                                src={comment.profile}
                                                alt="Profile Image"
                                                width={30}
                                                height={30}
                                                className='mt-1 rounded-full object-cover w-[60px] h-[60px]'
                                            />
                                        </>)}
                                    </div>
                                    <p className='text-3xl -mt-0.5'>{comment.timestamp}</p>
                                </div>
                                <p className='text-4xl leading-normal whitespace-pre-wrap mt-10 mb-10 mx-2'>{comment.content}</p>
                                {loggedInUser === comment.nickname && (<div className='text-3xl border-2 w-[80px] border-gray-400 text-gray-500 text-center p-1 ml-auto rounded-xl' onClick={() => handleDeleteClick(comment.id)}>삭제</div>)}
                            </div>
                        ))
                    ) : (
                        <p className="text-4xl">댓글이 없습니다.</p>
                    )}
                </div>
            )}
        </>
    );
}

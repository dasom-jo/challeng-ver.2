import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CommunityPostModal from './CommunityPostModal';
import styles from './css_module/PostModal.module.css'

export default function PostModal({open, handleClosePost, postDetail, setPosts, posts, postComment, setPostComment, getComment}) {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClosePost}
                aria-labelledby="responsive-dialog-title"
                className={styles.dialog}
                
            >   
                <DialogContent className={styles.dialogContent}>
                    <CommunityPostModal 
                        postDetail={postDetail} 
                        setPosts={setPosts} 
                        posts={posts} 
                        open={open} 
                        handleClosePost={handleClosePost}
                        postComment={postComment}
                        setPostComment={setPostComment}
                        getComment={getComment}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
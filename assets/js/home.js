{
    //method to create a post in dom
    let createNewPostDom = function(post, userName){
        return $(`<div id = "post-${post._id}" class = "post-item card">
            <div class = "card-body">
                <h4 class = "card-title">Post</h4>
                <p class = "card-text">${post.content}</p>
                <a class="delete delete-post-button" href="/posts/destroy/${post._id}">X</a>
                <div class = "comment-item card">
                    <div class="card-body">
                        <h5 class="card-title">Comments</h5>
                        <form action="/comments/create-comment" class = "new-comment-form" method="POST">
                            <div class = form-group>
                                <input class="form-control" required name="content" placeholder="Type Here...">
                            </div>
                            <input type="hidden" name="post_id" value="${post._id}">
                            <input class="btn btn-primary" type="submit" value = "Add Comment">
                        </form>
                    </div>
                </div>
                <div id = "post-comments-list-${post._id}">
                    
                </div>
            </div>
            <div class="card-footer">
                <p class="owner-name card-link text-primary">Posted by ${userName} </p>
            </div>
        </div>`);
    }


    //method to create a comment in DOM

    let createNewComment = function(comment, userName){
        return $(`<div id = "post-comments-${comment._id}" class="comment-item card">
            <div class="card-body">
                <h5 class="card-title">Comment</h5>
                <p class="card-text"> ${comment.content} </p>
                <a class="delete-comment-button delete" href="/comments/destroy/${comment._id}">X</a>
            </div>
            <div class="card-footer">
                <p class = "owner-name card-link text-primary">Commented by ${userName} </p>
            </div>
        </div>`);
    }


    //method to delete a post from DOM
    let deletePost = function(e){
        e.preventDefault();

        $.ajax({
            method: 'get',
            url: $(e.target).attr('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
                displayFlash('success', 'Post and associated comments deleted successfully!');
            },
            error: function(err){
                console.log(err.responseText);
                displayFlash('err', err.responseText);
            }
        });
    }

    //method to delete comment from DOM
    let deleteComment = function(e){
        e.preventDefault();

        $.ajax({
            method: 'get',
            url: $(e.target).attr('href'),
            success: function(data){
                $(`#post-comments-${data.data.comment_id}`).remove();
                displayFlash('success', 'Comment deleted successfully!');
            },
            error: function(err){
                console.log(err.responseText);
                displayFlash('error', err.responseText);
            }
        });
    }

    let createComment = function(e){
        e.preventDefault();

        $.ajax({
            method: 'post',
            url: '/comments/create-comment',
            data: $(e.target).serialize(),
            success: function(data){
                let newComment = createNewComment(data.data.comment, data.data.user_name);
                $(`#post-comments-list-${data.data.comment.post}`).prepend(newComment);
                displayFlash('success', 'Comment created successfully!');
                $(`#post-comments-${data.data.comment._id} .delete-comment-button`).click(deleteComment);
            },
            error: function(err){
                displayFlash('error', err.responseText);
                console.log(err.responseText);
            }
        });
    }

    //method to submit form data for new post using Ajax
    let createPost = function(){
        let postForm = $('#new-post-form');
        postForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                method: 'post',
                url: '/posts/create-post',
                data: postForm.serialize(),
                success: function(data){
                    let newPost = createNewPostDom(data.data.post, data.data.user_name);
                    $('#posts-list').prepend(newPost);
                    displayFlash('success', 'Post created successfully!');
                    $(`#post-${data.data.post._id} .delete-post-button`).click(deletePost);
                    $(`#post-${data.data.post._id} .new-comment-form`).submit(createComment);
                },
                error: function(err){
                    console.log('Error: ', err.responseText);
                    displayFlash('error', err.responseText);
                }
                
            });
        });
    }

    //add event listeners to all delete post links
    let deletePostListeners = function(){
        $('.delete-post-button').click(deletePost);
    }

    //add event listeners to all delete comment links
    let deleteCommentListeners = function(){
        $('.delete-comment-button').click(deleteComment);
    }

    //Add event listeners to all comment forms to create a comment
    let createCommentListeners = function(){
        $('.new-comment-form').submit(createComment);
    }




    //All function calls
    deletePostListeners();
    createPost();
    createCommentListeners();
    deleteCommentListeners();


    //display flash message for every ajax request
    function displayFlash(type, text){
        new Noty({
            theme: 'relax',
            text: text,
            type: type,
            layout: 'topRight',
            timeout: 1500
        }).show();
    }
}
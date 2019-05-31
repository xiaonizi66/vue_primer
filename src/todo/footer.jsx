export default {
    data(){
        return {
            author: 'saffi'
        }
    },
    render(h) {
        return (
            <div class="footer">
                <span>Written by {this.author}</span>
            </div>
        )
    }
}
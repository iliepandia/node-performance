class Node{
    constructor( value ){
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


const a = [2,1,5,2,8,1,10,29,1,3,20,21];

console.log( a.sort() );

let root = new Node(a.pop());

let current = null;
while( data = a.pop() ){
    current = root;
    next = null;

    while( current ){
        if( current.value == data ) break; // do nothing

        if( data < current.value ){
            next = current.left;
            if( next ){
                current = next;
                continue;
            }else{
                next = new Node(data);
                current.left = next;
                break;
            }
        }

        if( current.value < data ){
            next = current.right;
            if(next){
                current = next;
                continue;
            }else{
                next = new Node(data);
                current.right = next;
                break;
            }
        }
    }
}

function printInOrder(node){
    if(!node) return;
    printInOrder( node.left );
    console.log( node.value );
    printInOrder( node.right );
}

printInOrder(root);

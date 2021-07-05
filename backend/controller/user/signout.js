export default function signout(req, res){
    console.log('called');
    res.clearCookie('token');
    res.status(200).json({
        'Status': 'Successfully Sign out'
    });
}
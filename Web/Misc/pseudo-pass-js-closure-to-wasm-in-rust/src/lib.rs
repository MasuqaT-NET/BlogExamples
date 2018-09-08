extern "C" {
    fn call_closure(closure_id: i32, arg1: f64, arg2: f64, arg3: f64) -> f64;
}

#[no_mangle]
pub unsafe extern "C" fn with_closure_example(closure_id: i32, arg1: f64, arg2: f64, arg3: f64) -> f64 {
    call_closure(closure_id, arg1, arg2, arg3)
}

static mut DATA: &mut [f64; 1000000] = &mut [0f64; 1000000];

#[no_mangle]
pub unsafe extern "C" fn init_data() {
    for i in 0..DATA.len() {
        DATA[i] = (i + 1) as f64;
    }
}

#[no_mangle]
pub unsafe extern "C" fn fold(closure_id: i32, init: f64) -> f64 {
    DATA.iter().fold(init, |left, right| call_closure(closure_id, left, *right, 0f64))
}


static ADD_FUNC: fn(f64, &f64) -> f64 = |left: f64, right: &f64| left + *right;

#[no_mangle]
pub unsafe extern "C" fn fold_as_sum_in_rust(init: f64) -> f64 {
    DATA.iter().fold(init, ADD_FUNC)
}

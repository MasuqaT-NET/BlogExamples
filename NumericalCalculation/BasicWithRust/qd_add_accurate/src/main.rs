#[derive(Debug, Copy, Clone)]
struct SumError {
    sum: f64,
    error: f64,
}

#[derive(Debug, Copy, Clone)]
struct ExtendedQuadDouble(f64, f64, f64, f64, f64);

#[derive(Debug, Copy, Clone)]
struct NormalizedQuadDouble(f64, f64, f64, f64);

#[inline]
fn quick_two_sum(a: f64, b: f64) -> SumError {
    let s = a + b;
    let e = b - (s - a);

    SumError { sum: s, error: e }
}

#[inline]
fn two_sum(a: f64, b: f64) -> SumError {
    let s = a + b;
    let v = s - a;
    let e = (a - (s - v)) + (b - v);

    SumError { sum: s, error: e }
}

#[inline]
fn renormalize(a: ExtendedQuadDouble) -> NormalizedQuadDouble {
    let SumError { sum: s, error: t4 } = quick_two_sum(a.3, a.4);
    let SumError { sum: s, error: t3 } = quick_two_sum(a.2, s);
    let SumError { sum: s, error: t2 } = quick_two_sum(a.1, s);
    let SumError { sum: t0, error: t1 } = quick_two_sum(a.0, s);
    let t = [t0, t1, t2, t3, t4];

    let mut b = [t[0], t[1], t[2], t[3]];
    let mut s = t[0];
    let mut k = 0;
    for i in 1..5 {
        let r = quick_two_sum(s, t[i]);
        s = r.sum;
        let e = r.error;
        if e != 0.0 {
            b[k] = s;
            s = e;
            k = k + 1;
        }
    }
    NormalizedQuadDouble(b[0], b[1], b[2], b[3])
}

#[inline]
fn qd_d_add(a: NormalizedQuadDouble, b: f64) -> NormalizedQuadDouble {
    let SumError { sum: t0, error: e } = two_sum(a.0, b);
    let SumError { sum: t1, error: e } = two_sum(a.1, e);
    let SumError { sum: t2, error: e } = two_sum(a.2, e);
    let SumError { sum: t3, error: t4 } = two_sum(a.3, e);

    renormalize(ExtendedQuadDouble(t0, t1, t2, t3, t4))
}

#[inline]
fn double_accumulate(u: f64, v: f64, x: f64) -> (f64, f64, f64) {
    let SumError { sum: s, error: mut v } = two_sum(v, x);
    let SumError { sum: mut s, error: mut u } = two_sum(u, s);
    if u == 0.0 {
        u = s;
        s = 0.0;
    }
    if v == 0.0 {
        v = u;
        u = s;
        s = 0.0;
    }

    (s, u, v)
}

#[inline]
fn qd_add_accurate(a: NormalizedQuadDouble, b: NormalizedQuadDouble) -> NormalizedQuadDouble {
    // merge sort
    let a = [a.0, a.1, a.2, a.3];
    let b = [b.0, b.1, b.2, b.3];
    let mut x = [0.0; 8];

    let mut i = 0; // for a
    let mut j = 0; // for b
    for ptr in 0..8 {
        if b.len() <= j || a.len() > i && a[i].abs() > b[j].abs() {
            x[ptr] = a[i];
            i += 1;
        } else {
            x[ptr] = b[j];
            j += 1;
        }
    }
    let x = x;

    let mut u = 0.0;
    let mut v = 0.0;
    let mut k = 0;
    let mut i = 0;
    let mut c = [0.0; 4];
    while k < 4 && i < 8 {
        let r = double_accumulate(u, v, x[i]);
        let s = r.0;
        u = r.1;
        v = r.2;

        if s != 0.0 {
            c[k] = s;
            k = k + 1;
        }
        i = i + 1;
    }
    if k < 2 {
        c[k + 1] = v;
    }
    if k < 3 {
        c[k] = u;
    }

    renormalize(ExtendedQuadDouble(c[0], c[1], c[2], c[3], 0.0))
}

fn main() {
    // lose data
    println!("{:.10}", 3E-9_f64 + 7E+9_f64);

    let qd = NormalizedQuadDouble(3E-9_f64, 0.0, 0.0, 0.0);
    let qd_result_1 = qd_d_add(qd, 7E+9_f64);
    println!("{:?}", qd_result_1);

    let qd_big = NormalizedQuadDouble(3E+18_f64, 5E+9_f64, 0.0, 0.0);
    let qd_small = NormalizedQuadDouble(7E-9_f64, 9E-18_f64, 0.0, 0.0);
    let qd_result_2 = qd_add_accurate(qd_big, qd_small);
    println!("{:?}", qd_result_2);
}
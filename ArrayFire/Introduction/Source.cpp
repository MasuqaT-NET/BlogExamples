#include <arrayfire.h>
#include "RangeGen.h"

int main() {
	RangeGen range(-1.0, 1.0, 0.25);// (double begin, double end, double step)
	af::array x = af::seq(range.begin, 1.0, 0.25);
	af::array y = x * x;
	af::print("y is ...", y);
	return 0;
}
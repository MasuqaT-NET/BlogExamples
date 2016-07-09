#include <arrayfire.h>

int main() {
	af::array x = af::seq(-1.0, 1.0, 0.25);
	af::array y = x * x;
	af::print("y is ...", y);
	return 0;
}

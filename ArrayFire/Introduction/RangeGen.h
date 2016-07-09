#pragma once
class RangeGen
{
public:
	RangeGen(double begin, double end, double step);
	~RangeGen();

	double begin, end, step;
};


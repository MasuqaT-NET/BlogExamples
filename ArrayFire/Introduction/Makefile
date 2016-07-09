NAME=Introduction

LIBS=-lafcuda # -lafcpu, -lafopencl, -lafcuda, -laf
LIB_PATHS=-L/usr/local/lib
INCLUDES=-I/usr/local/include
CC=clang++ $(COMPILER_OPTIONS)
COMPILER_OPTIONS=-std=c++11 -g
OBJDIR=./bld

SRCS=$(wildcard *.cpp)
OBJS=$(addprefix $(OBJDIR)/, ${SRCS:.cpp=.o})

.PHONY: all, run, clean
all: mk_bld_dir $(NAME)

mk_bld_dir:
	mkdir -p $(OBJDIR)

$(NAME): $(OBJS)
	$(CC) -o $(OBJDIR)/$(NAME) $(OBJS) $(LIBS) $(LIB_PATHS)

$(OBJDIR)/%.o: %.cpp
	$(CC) $(INCLUDES) -c -o $@ $<

run:
	$(OBJDIR)/$(NAME)

clean:
	@- $(RM) -r $(OBJDIR)


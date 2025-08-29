#!/usr/bin/env python3
"""
FRAIM Python CLI
Framework for Rigor-based AI Management
Where humans become AI managers through rigorous methodology
"""

import sys
import argparse

def show_banner():
    """Display FRAIM banner"""
    banner = """
╔══════════════════════════════════════════════════════════════╗
║  🚀 FRAIM                                                  ║
║  Framework for Rigor-based AI Management                    ║
║  Where humans become AI managers                            ║
╚══════════════════════════════════════════════════════════════╝
"""
    print(banner)

def show_help():
    """Display help information"""
    show_banner()
    print("🤖 Welcome to FRAIM!")
    print("Where humans become AI managers through rigorous methodology\n")

    print("🚀 Quick commands:")
    print("  pip install fraim-framework")
    print("  fraim init     # Setup current repository")
    print("  fraim rigor    # Learn RIGOR methodology")
    print("  fraim --help   # Full documentation\n")

    print("🧠 The RIGOR Methodology:")
    print("  R - Reviews: Structured feedback and approval processes")
    print("  I - Idempotency: Safe, repeatable operations")
    print("  G - GitOps: Git as the single source of truth")
    print("  O - Observability: Complete visibility into AI activities")
    print("  R - Rollback: Safe recovery from any state\n")

    print("📚 Documentation: https://github.com/mathursrus/Ashley-Calendar-AI/tree/master/FRAIM")
    print("🎯 Ready to become an AI manager? Run: fraim init")

def show_rigor():
    """Display RIGOR methodology information"""
    show_banner()
    print("🧠 The RIGOR Methodology for AI Management\n")

    print("R - Reviews:")
    print("  • Structured feedback and approval processes")
    print("  • Code review workflows with AI agents")
    print("  • Automated quality gates and checks")
    print("  • Human oversight of AI decisions\n")

    print("I - Idempotency:")
    print("  • Safe, repeatable operations")
    print("  • No side effects from multiple runs")
    print("  • Consistent results every time")
    print("  • Rollback-friendly changes\n")

    print("G - GitOps:")
    print("  • Git as the single source of truth")
    print("  • Declarative infrastructure and workflows")
    print("  • Automated deployments from Git changes")
    print("  • Version-controlled AI agent configurations\n")

    print("O - Observability:")
    print("  • Complete visibility into AI activities")
    print("  • Metrics, logs, and tracing")
    print("  • Performance monitoring and alerting")
    print("  • Audit trails for compliance\n")

    print("R - Rollback:")
    print("  • Safe recovery from any state")
    print("  • Automated rollback mechanisms")
    print("  • Point-in-time recovery")
    print("  • Zero-downtime deployments\n")

    print("🎯 This methodology transforms you from a developer into an AI manager!")

def main():
    """Main CLI entry point"""
    parser = argparse.ArgumentParser(
        description="FRAIM: Framework for Rigor-based AI Management",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  fraim init     # Setup FRAIM in current repository
  fraim rigor    # Learn about RIGOR methodology
  fraim --help   # Show this help message
        """
    )
    
    parser.add_argument(
        "command",
        nargs="?",
        choices=["init", "rigor", "setup", "wizard"],
        help="Command to execute"
    )
    
    parser.add_argument(
        "--version",
        action="version",
        version="FRAIM 1.0.0"
    )
    
    args = parser.parse_args()
    
    if not args.command or args.command == "help":
        show_help()
        return
    
    if args.command == "rigor":
        show_rigor()
        return
    
    if args.command in ["init", "setup"]:
        show_banner()
        print("🚀 Setting up FRAIM in current repository...\n")
        print("📋 This will:")
        print("  • Create GitHub labels for AI management")
        print("  • Set up automated workflows")
        print("  • Configure AI agent rules")
        print("  • Initialize documentation\n")
        print("💡 Run: fraim init  # For full setup")
        print("🔧 Or run: fraim wizard  # For interactive setup")
        return
    
    if args.command == "wizard":
        show_banner()
        print("🔮 FRAIM Interactive Setup Wizard\n")
        print("This wizard will guide you through:")
        print("  1. Repository configuration")
        print("  2. AI agent setup")
        print("  3. Workflow customization")
        print("  4. Team member onboarding\n")
        print("💡 Run: fraim wizard  # To start the wizard")
        return

if __name__ == "__main__":
    main()

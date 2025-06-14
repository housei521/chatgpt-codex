import React, { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: 'active' | 'working' | 'thinking' | 'idle';
  task: string;
  metrics: {
    value: string;
    label: string;
  }[];
  type: 'mortgage' | 'realtor' | 'architect' | 'developer' | 'builder' | 'construction' | 'zoning';
  priority: 'high' | 'medium' | 'low';
  workload: number;
  responseTime: number;
  completionRate: number;
  lastActive: string;
  learningProgress: number;
  efficiency: number;
}

interface Message {
  id: string;
  sender: string;
  role: string;
  content: string;
  status: 'OK' | 'Working' | 'Thinking' | 'Ready';
  avatar: string;
  timestamp: string;
  type: 'mortgage' | 'realtor' | 'architect' | 'developer' | 'builder' | 'construction' | 'zoning';
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'active' | 'pending' | 'delayed';
  progress?: string;
  startDate: string;
  endDate: string;
  dependencies?: string[];
  assignedAgent?: string;
}

interface TimelineTask {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  progress: number;
  dependencies: string[];
  assignedAgent: string;
  type: 'permit' | 'construction' | 'inspection' | 'planning';
  critical: boolean;
}

interface BudgetItem {
  id: string;
  category: string;
  budgeted: number;
  actual: number;
  variance: number;
  status: 'on-track' | 'over-budget' | 'under-budget';
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  dueDate: string;
  progress: number;
  estimatedHours: number;
  actualHours: number;
}

interface SmartRoutingEvent {
  id: string;
  timestamp: string;
  fromAgent: string;
  toAgent: string;
  taskType: string;
  reason: string;
  timeSaved: string;
  efficiency: number;
}

interface CollaborationMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: 'online' | 'away' | 'offline';
  permissions: 'admin' | 'editor' | 'viewer';
  lastActive: string;
  joinDate: string;
}

interface ShareOption {
  id: string;
  type: 'email' | 'link' | 'workspace' | 'export';
  title: string;
  description: string;
  icon: string;
  permissions: string[];
}

interface Template {
  id: string;
  name: string;
  type: string;
  description: string;
  code: string;
}

interface PredictiveData {
  propertyValue: { current: number; projected: number; confidence: number };
  interestRates: { current: number; projected: number; trend: 'up' | 'down' | 'stable' };
  constructionCosts: { current: number; projected: number; volatility: 'high' | 'medium' | 'low' };
  marketTrends: { appreciation: number; demandIndex: number; supplyIndex: number };
}

interface Insight {
  id: string;
  type: 'warning' | 'opportunity' | 'optimization' | 'compliance';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  actionable: boolean;
  suggested_action?: string;
}

  const HOUSEI_Dashboard: React.FC = () => {
  const [currentView, setCurrentView] = useState<'cards' | 'code' | 'timeline'>('cards');
  const [activeCodeAgent, setActiveCodeAgent] = useState<string>('morty');
  const [selectedProject, setSelectedProject] = useState<string>('Austin Residential Project');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showAgentModal, setShowAgentModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showTemplateLibrary, setShowTemplateLibrary] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAIHub, setShowAIHub] = useState(false);
  const [showPredictiveAnalytics, setShowPredictiveAnalytics] = useState(false);
  const [showWorkflowEngine, setShowWorkflowEngine] = useState(false);
  const [showSmartSearch, setShowSmartSearch] = useState(false);
  const [showVoiceCommand, setShowVoiceCommand] = useState(false);
  const [showCollaboration, setShowCollaboration] = useState(false);
  const [showIoTDashboard, setShowIoTDashboard] = useState(false);
  const [showComplianceCenter, setShowComplianceCenter] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [showCodeOptimizeModal, setShowCodeOptimizeModal] = useState(false);
  const [showBudgetModal, setShowBudgetModal] = useState(false);
  const [showTasksModal, setShowTasksModal] = useState(false);
  const [showTimelineAIOptimize, setShowTimelineAIOptimize] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showSmartRoutingPanel, setShowSmartRoutingPanel] = useState(false);
  const [showCollaborateModal, setShowCollaborateModal] = useState(false);
  const [showQuickExportModal, setShowQuickExportModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Close all other modals when opening a new one
  const closeAllModals = () => {
    setShowAnalytics(false);
    setShowAIHub(false);
    setShowPredictiveAnalytics(false);
    setShowWorkflowEngine(false);
    setShowSmartSearch(false);
    setShowVoiceCommand(false);
    setShowCollaboration(false);
    setShowIoTDashboard(false);
    setShowComplianceCenter(false);
    setShowDeployModal(false);
    setShowCodeOptimizeModal(false);
    setShowBudgetModal(false);
    setShowTasksModal(false);
    setShowTimelineAIOptimize(false);
    setShowExportModal(false);
    setShowSmartRoutingPanel(false);
    setShowCollaborateModal(false);
    setShowQuickExportModal(false);
    setShowShareModal(false);
  };

  const openModal = (modalName: string) => {
    closeAllModals();
    switch (modalName) {
      case 'aiHub': setShowAIHub(true); break;
      case 'predictiveAnalytics': setShowPredictiveAnalytics(true); break;
      case 'workflowEngine': setShowWorkflowEngine(true); break;
      case 'smartRoutingPanel': setShowSmartRoutingPanel(true); break;
      case 'budgetModal': setShowBudgetModal(true); break;
      case 'tasksModal': setShowTasksModal(true); break;
      case 'collaborateModal': setShowCollaborateModal(true); break;
      case 'quickExportModal': setShowQuickExportModal(true); break;
    }
  };
  const [isCodeFullscreen, setIsCodeFullscreen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const [draggedAgent, setDraggedAgent] = useState<string | null>(null);
  const [currentCodeTab, setCurrentCodeTab] = useState<string>('main.py');
  const [codeContent, setCodeContent] = useState<string>('');
  const [testMode, setTestMode] = useState(false);
  const [timelineView, setTimelineView] = useState<'gantt' | 'milestones' | 'risks'>('gantt');
  const [isListening, setIsListening] = useState(false);
  const [voiceCommand, setVoiceCommand] = useState('');
  const [aiOrchestrator, setAiOrchestrator] = useState(true);
  const [smartRouting, setSmartRouting] = useState(true);
  const [showFloatingButtons, setShowFloatingButtons] = useState(true);
  const [mobileView, setMobileView] = useState<'chat' | 'workspace'>('workspace');

  // Handle responsive design and screen size detection
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width < 768) {
        setSidebarCollapsed(true);
      } else if (width >= 1024) {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle ESC key for fullscreen exit
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCodeFullscreen) {
        setIsCodeFullscreen(false);
      }
    };

    if (isCodeFullscreen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [isCodeFullscreen]);

  const budgetData: BudgetItem[] = [
    {
      id: '1',
      category: 'Property Acquisition',
      budgeted: 585000,
      actual: 585000,
      variance: 0,
      status: 'on-track'
    },
    {
      id: '2',
      category: 'Construction Materials',
      budgeted: 180000,
      actual: 165000,
      variance: -15000,
      status: 'under-budget'
    },
    {
      id: '3',
      category: 'Labor Costs',
      budgeted: 120000,
      actual: 135000,
      variance: 15000,
      status: 'over-budget'
    },
    {
      id: '4',
      category: 'Permits & Fees',
      budgeted: 25000,
      actual: 23500,
      variance: -1500,
      status: 'under-budget'
    },
    {
      id: '5',
      category: 'Professional Services',
      budgeted: 45000,
      actual: 41200,
      variance: -3800,
      status: 'under-budget'
    },
    {
      id: '6',
      category: 'Contingency',
      budgeted: 50000,
      actual: 12000,
      variance: -38000,
      status: 'under-budget'
    }
  ];

  const tasksData: Task[] = [
    {
      id: '1',
      title: 'Complete Building Permit Application',
      description: 'Submit final building permit application to Austin City Planning Department',
      assignedTo: 'Zoe',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-06-15',
      progress: 85,
      estimatedHours: 16,
      actualHours: 14
    },
    {
      id: '2',
      title: 'Finalize Architectural Plans',
      description: 'Complete detailed architectural drawings for 2,400 sq ft addition',
      assignedTo: 'Aria',
      priority: 'high',
      status: 'in-progress',
      dueDate: '2025-06-20',
      progress: 75,
      estimatedHours: 40,
      actualHours: 35
    },
    {
      id: '3',
      title: 'Material Cost Analysis',
      description: 'Analyze current material costs and negotiate with suppliers',
      assignedTo: 'Dex',
      priority: 'medium',
      status: 'pending',
      dueDate: '2025-06-25',
      progress: 30,
      estimatedHours: 12,
      actualHours: 4
    },
    {
      id: '4',
      title: 'Schedule Construction Crews',
      description: 'Coordinate with construction teams for project timeline',
      assignedTo: 'Bea',
      priority: 'medium',
      status: 'pending',
      dueDate: '2025-07-01',
      progress: 0,
      estimatedHours: 8,
      actualHours: 0
    },
    {
      id: '5',
      title: 'Safety Protocol Review',
      description: 'Review and update safety protocols for construction phase',
      assignedTo: 'Con',
      priority: 'high',
      status: 'completed',
      dueDate: '2025-06-10',
      progress: 100,
      estimatedHours: 6,
      actualHours: 5
    },
    {
      id: '6',
      title: 'Insurance Documentation',
      description: 'Update insurance policies for construction coverage',
      assignedTo: 'Morty',
      priority: 'medium',
      status: 'blocked',
      dueDate: '2025-06-18',
      progress: 20,
      estimatedHours: 4,
      actualHours: 1
    }
  ];

  const smartRoutingEvents: SmartRoutingEvent[] = [
    {
      id: '1',
      timestamp: 'Just now',
      fromAgent: 'Morty (92% busy)',
      toAgent: 'Zoe (23% busy)',
      taskType: 'Austin mortgage analysis',
      reason: 'Workload optimization',
      timeSaved: '3.2 hours',
      efficiency: 76
    },
    {
      id: '2',
      timestamp: '5 min ago',
      fromAgent: 'Aria (89% busy)',
      toAgent: 'Bea (23% busy)',
      taskType: 'CAD drafting tasks',
      reason: 'Skill-based routing',
      timeSaved: '2.5 hours',
      efficiency: 68
    },
    {
      id: '3',
      timestamp: '12 min ago',
      fromAgent: 'Dex (85% busy)',
      toAgent: 'Con (34% busy)',
      taskType: 'Material specifications review',
      reason: 'Availability optimization',
      timeSaved: '1.8 hours',
      efficiency: 42
    },
    {
      id: '4',
      timestamp: '25 min ago',
      fromAgent: 'Reggie (91% busy)',
      toAgent: 'Morty (67% busy)',
      taskType: 'Market analysis compilation',
      reason: 'Expertise matching',
      timeSaved: '4.1 hours',
      efficiency: 83
    }
  ];

  const collaborationMembers: CollaborationMember[] = [
    {
      id: '1',
      name: 'John Mitchell',
      email: 'john.mitchell@company.com',
      role: 'Project Manager',
      avatar: '👨‍💼',
      status: 'online',
      permissions: 'admin',
      lastActive: 'Active now',
      joinDate: '2025-01-15'
    },
    {
      id: '2',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'Senior Architect',
      avatar: '👩‍🏗️',
      status: 'online',
      permissions: 'editor',
      lastActive: '2 min ago',
      joinDate: '2025-02-01'
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      email: 'mike.rodriguez@contractor.com',
      role: 'Construction Lead',
      avatar: '👷‍♂️',
      status: 'away',
      permissions: 'editor',
      lastActive: '15 min ago',
      joinDate: '2025-03-10'
    },
    {
      id: '4',
      name: 'Lisa Wang',
      email: 'lisa.wang@finance.com',
      role: 'Financial Analyst',
      avatar: '👩‍💰',
      status: 'offline',
      permissions: 'viewer',
      lastActive: '2 hours ago',
      joinDate: '2025-01-20'
    },
    {
      id: '5',
      name: 'David Thompson',
      email: 'david.thompson@legal.com',
      role: 'Legal Advisor',
      avatar: '👨‍⚖️',
      status: 'offline',
      permissions: 'viewer',
      lastActive: '1 day ago',
      joinDate: '2025-02-15'
    }
  ];

  const shareOptions: ShareOption[] = [
    {
      id: '1',
      type: 'email',
      title: 'Email Invitation',
      description: 'Send secure email invites to team members',
      icon: '📧',
      permissions: ['viewer', 'editor', 'admin']
    },
    {
      id: '2',
      type: 'link',
      title: 'Shareable Link',
      description: 'Generate a secure link with custom permissions',
      icon: '🔗',
      permissions: ['viewer', 'editor']
    },
    {
      id: '3',
      type: 'workspace',
      title: 'Workspace Integration',
      description: 'Share with Slack, Teams, or other workspaces',
      icon: '💬',
      permissions: ['viewer', 'editor']
    },
    {
      id: '4',
      type: 'export',
      title: 'Export & Share',
      description: 'Export data and share via external platforms',
      icon: '📤',
      permissions: ['viewer']
    }
  ];

  const agents: Agent[] = [
    {
      id: 'morty',
      name: 'Morty',
      role: 'Loan Officer',
      avatar: '🏦',
      status: 'active',
      task: 'Loan pre-approval completed. $640,000 approved at 6.75% for 30-year conventional loan.',
      metrics: [
        { value: '$640K', label: 'Approved' },
        { value: '6.75%', label: 'Rate' },
        { value: '98%', label: 'Confidence' }
      ],
      type: 'mortgage',
      priority: 'high',
      workload: 85,
      responseTime: 2.3,
      completionRate: 94,
      lastActive: '2 mins ago',
      learningProgress: 87,
      efficiency: 92
    },
    {
      id: 'reggie',
      name: 'Reggie',
      role: 'Real Estate Agent',
      avatar: '🏠',
      status: 'active',
      task: 'Property purchased: 2847 Oak Creek Dr, Austin TX. CMA shows excellent investment potential.',
      metrics: [
        { value: '$585K', label: 'Purchase' },
        { value: '15%', label: 'Equity' },
        { value: '92%', label: 'Match Score' }
      ],
      type: 'realtor',
      priority: 'high',
      workload: 78,
      responseTime: 1.8,
      completionRate: 96,
      lastActive: '5 mins ago',
      learningProgress: 91,
      efficiency: 95
    },
    {
      id: 'aria',
      name: 'Aria',
      role: 'Architect',
      avatar: '📐',
      status: 'working',
      task: 'Creating architectural plans for 2,400 sq ft addition. Ensuring compliance with Austin building codes.',
      metrics: [
        { value: '2,400', label: 'Sq Ft' },
        { value: '85%', label: 'Complete' },
        { value: '100%', label: 'Compliant' }
      ],
      type: 'architect',
      priority: 'medium',
      workload: 92,
      responseTime: 3.1,
      completionRate: 88,
      lastActive: '1 min ago',
      learningProgress: 84,
      efficiency: 89
    },
    {
      id: 'dex',
      name: 'Dex',
      role: 'Developer',
      avatar: '🔧',
      status: 'working',
      task: 'Developing technical specifications and material lists based on architectural plans.',
      metrics: [
        { value: '$180K', label: 'Materials' },
        { value: '60%', label: 'Complete' },
        { value: '95%', label: 'Accuracy' }
      ],
      type: 'developer',
      priority: 'medium',
      workload: 67,
      responseTime: 2.7,
      completionRate: 91,
      lastActive: '3 mins ago',
      learningProgress: 79,
      efficiency: 86
    },
    {
      id: 'bea',
      name: 'Bea',
      role: 'Builder',
      avatar: '👷',
      status: 'idle',
      task: 'Ready to create construction schedule once technical specifications are finalized.',
      metrics: [
        { value: '16', label: 'Weeks' },
        { value: '8', label: 'Crews' },
        { value: 'Ready', label: 'Status' }
      ],
      type: 'builder',
      priority: 'low',
      workload: 23,
      responseTime: 4.2,
      completionRate: 89,
      lastActive: '15 mins ago',
      learningProgress: 76,
      efficiency: 81
    },
    {
      id: 'con',
      name: 'Con',
      role: 'Construction Agent',
      avatar: '🏗️',
      status: 'idle',
      task: 'Monitoring design phase progress. Safety protocols and quality standards prepared.',
      metrics: [
        { value: '24/7', label: 'Monitor' },
        { value: '100%', label: 'Safety' },
        { value: 'Ready', label: 'Status' }
      ],
      type: 'construction',
      priority: 'low',
      workload: 34,
      responseTime: 3.8,
      completionRate: 92,
      lastActive: '8 mins ago',
      learningProgress: 88,
      efficiency: 94
    },
    {
      id: 'zoe',
      name: 'Zoe',
      role: 'Zoning & Permitting',
      avatar: '📋',
      status: 'thinking',
      task: 'Preparing permit applications. Zoning compliance verified. Building permit ready to submit.',
      metrics: [
        { value: '100%', label: 'Compliant' },
        { value: '3', label: 'Permits' },
        { value: 'Ready', label: 'Submit' }
      ],
      type: 'zoning',
      priority: 'high',
      workload: 71,
      responseTime: 2.9,
      completionRate: 87,
      lastActive: 'Just now',
      learningProgress: 82,
      efficiency: 90
    }
  ];

  const predictiveData: PredictiveData = {
    propertyValue: { current: 585000, projected: 627000, confidence: 87 },
    interestRates: { current: 6.75, projected: 7.2, trend: 'up' },
    constructionCosts: { current: 180000, projected: 195000, volatility: 'medium' },
    marketTrends: { appreciation: 8.2, demandIndex: 74, supplyIndex: 42 }
  };

  const aiInsights: Insight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Optimal Construction Start Date',
      description: 'AI predicts starting construction in 3 weeks will save $18K due to material price dip',
      impact: 'high',
      actionable: true,
      suggested_action: 'Accelerate permit approval process'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Weather Risk Alert',
      description: 'Heavy rain season starting July 15th could delay foundation work by 2 weeks',
      impact: 'medium',
      actionable: true,
      suggested_action: 'Schedule foundation completion by July 10th'
    },
    {
      id: '3',
      type: 'optimization',
      title: 'Agent Workload Imbalance',
      description: 'Sarah (92% workload) could benefit from task redistribution to Mike (23% workload)',
      impact: 'medium',
      actionable: true,
      suggested_action: 'Reassign drafting tasks to available agents'
    },
    {
      id: '4',
      type: 'compliance',
      title: 'New Building Code Update',
      description: 'Austin updated electrical code requirements effective July 1st - affects current plans',
      impact: 'high',
      actionable: true,
      suggested_action: 'Review and update electrical specifications'
    }
  ];

  const templates: Template[] = [
    {
      id: 'mortgage-calc',
      name: 'Mortgage Calculator',
      type: 'Financial',
      description: 'Advanced mortgage calculations with market rates',
      code: `def calculate_mortgage(principal, rate, years):
    monthly_rate = rate / 12 / 100
    months = years * 12
    payment = principal * (monthly_rate * (1 + monthly_rate)**months) / ((1 + monthly_rate)**months - 1)
    return payment`
    },
    {
      id: 'market-analysis',
      name: 'Market Analysis',
      type: 'Real Estate',
      description: 'Comparative market analysis tool',
      code: `def analyze_market(location, property_type, sq_ft):
    comps = get_comparable_properties(location, property_type)
    price_per_sqft = calculate_average_price_per_sqft(comps)
    estimated_value = price_per_sqft * sq_ft
    return estimated_value, comps`
    },
    {
      id: 'permit-tracker',
      name: 'Permit Tracker',
      type: 'Compliance',
      description: 'Track permit applications and compliance',
      code: `class PermitTracker:
    def __init__(self):
        self.permits = []
    
    def add_permit(self, permit_type, status, deadline):
        permit = {
            'type': permit_type,
            'status': status,
            'deadline': deadline,
            'submitted': datetime.now()
        @media (max-width: 480px) {
          /* Smaller mobile adjustments for timeline modals */
          .modal-header {
            padding: 10px 12px;
            /* Enhanced timeline button icons for mobile */
          .timeline-btn[data-view="gantt"]::before {
            content: "📊";
            margin-right: 3px;
            font-size: 10px;
            /* AI Hub Modal Mobile Optimizations */
          .ai-hub-content {
            padding: 8px 12px;
            overflow-y: auto;
            flex: 1;
            /* Analytics Modal Mobile */
          .analytics-content {
            padding: 8px 12px;
            flex: 1;
            overflow-y: auto;
          @media (max-width: 480px) {
          /* Extra small mobile optimizations */
          .modal-header {
            padding: 10px 12px;
            /* Budget & Task Modal Mobile Content Optimization */
          .budget-content,
          .tasks-content,
          .collaborate-content,
          .quick-export-content,
          .share-content {
            padding: 6px 10px;
            flex: 1;
            overflow-y: auto;
          }

          .budget-summary,
          .task-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin-bottom: 12px;
          }

          .summary-card,
          .stat-card {
            padding: 8px;
            border-radius: 6px;
          }

          .summary-card h3,
          .stat-card .stat-label {
            font-size: 9px;
            margin-bottom: 4px;
          }

          .budget-amount,
          .variance-amount,
          .forecast-amount,
          .stat-number {
            font-size: 16px;
            margin-bottom: 2px;
          }

          .budget-status,
          .variance-status,
          .forecast-confidence {
            font-size: 8px;
          }

          .budget-breakdown h3,
          .tasks-overview h3,
          .collaboration-overview h3 {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .table-header,
          .table-row {
            grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
            gap: 8px;
            padding: 6px 8px;
            font-size: 9px;
          }

          .category-name {
            font-size: 10px;
          }

          .task-filters {
            gap: 6px;
            margin-bottom: 12px;
          }

          .filter-select,
          .add-task-btn {
            padding: 4px 8px;
            font-size: 10px;
            border-radius: 4px;
          }

          .tasks-list {
            gap: 8px;
            margin-bottom: 12px;
          }

          .task-item {
            padding: 8px;
            gap: 12px;
            border-radius: 6px;
          }

          .task-title {
            font-size: 12px;
            margin-bottom: 4px;
          }

          .task-description {
            font-size: 10px;
            margin-bottom: 6px;
          }

          .task-meta {
            gap: 8px;
            font-size: 9px;
          }

          .task-priority,
          .task-status {
            font-size: 8px;
            padding: 2px 4px;
          }

          .progress-label {
            font-size: 11px;
            margin-bottom: 4px;
          }

          .task-actions {
            gap: 4px;
          }

          .task-action {
            padding: 3px 6px;
            font-size: 9px;
          }

          /* Collaboration Modal Mobile */
          .collab-stats {
            grid-template-columns: repeat(4, 1fr);
            gap: 6px;
          }

          .collab-stat {
            padding: 8px;
          }

          .collab-stat .stat-value {
            font-size: 16px;
            margin-bottom: 2px;
          }

          .collab-stat .stat-label {
            font-size: 8px;
          }

          .members-list {
            gap: 8px;
          }

          .member-item {
            padding: 8px;
            gap: 8px;
            border-radius: 6px;
          }

          .member-avatar {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

          .member-name {
            font-size: 12px;
            margin-bottom: 1px;
          }

          .member-role {
            font-size: 10px;
            margin-bottom: 1px;
          }

          .member-email {
            font-size: 8px;
          }

          .permission-badge {
            font-size: 8px;
            padding: 2px 4px;
          }

          .last-active {
            font-size: 8px;
          }

          .action-btn {
            width: 20px;
            height: 20px;
            font-size: 10px;
          }

          /* Export & Share Modal Mobile */
          .shortcuts-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .shortcut-card {
            padding: 8px;
            border-radius: 6px;
          }

          .shortcut-icon {
            width: 32px;
            height: 32px;
            font-size: 14px;
            margin-bottom: 6px;
          }

          .shortcut-content h4 {
            font-size: 11px;
            margin-bottom: 3px;
          }

          .shortcut-content p {
            font-size: 9px;
            margin-bottom: 4px;
          }

          .shortcut-format {
            font-size: 8px;
            padding: 1px 3px;
          }

          .share-methods {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .share-option-card {
            padding: 8px;
            border-radius: 6px;
          }

          .share-icon {
            width: 24px;
            height: 24px;
            font-size: 12px;
          }

          .share-option-info h4 {
            font-size: 11px;
            margin-bottom: 2px;
          }

          .share-option-info p {
            font-size: 9px;
          }

          .share-action-btn {
            padding: 4px 8px;
            font-size: 9px;
          }

          .modal-header h2 {
            font-size: 15px;
          }

          .modal-body {
            padding: 8px 12px;
          }

          .modal-footer {
            padding: 10px 12px;
          }

          .modal-footer button {
            padding: 8px 12px;
            font-size: 13px;
          }

          /* AI Hub extra small */
          .ai-hub-content {
            padding: 6px 10px;
          }

          .ai-activity-feed {
            padding: 10px;
            margin-bottom: 12px;
          }

          .ai-activity-feed h3 {
            font-size: 13px;
          }

          .activity-item {
            padding: 6px;
            gap: 6px;
          }

          .activity-content {
            font-size: 11px;
          }

          .ai-feature-card {
            padding: 10px;
          }

          .feature-icon {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }

          .ai-feature-card h3 {
            font-size: 13px;
          }

          .ai-feature-card p {
            font-size: 11px;
          }

          .insights-grid {
            gap: 8px;
          }

          .insight-card {
            padding: 10px;
          }

          .insight-card h4 {
            font-size: 12px;
          }

          .insight-card p {
            font-size: 10px;
          }

          /* Analytics extra small */
          .analytics-content {
            padding: 6px 10px;
          }

          .analytics-card {
            padding: 10px;
          }

          .analytics-card h3 {
            font-size: 13px;
          }

          .forecast-value .current,
          .forecast-value .projected {
            font-size: 18px;
          }

          .current-rate {
            font-size: 22px;
          }

          /* Voice extra small */
          .voice-content {
            padding: 12px 10px;
          }

          .voice-circle {
            width: 70px;
            height: 70px;
          }

          .voice-icon {
            font-size: 28px;
          }

          .voice-status {
            font-size: 13px;
          }

          .command-item {
            padding: 6px;
            font-size: 11px;
          }

          /* Search extra small */
          .search-content {
            padding: 10px;
          }

          .smart-search-input {
            padding: 8px 10px;
            font-size: 13px;
          }

          .search-btn {
            padding: 8px 12px;
            font-size: 13px;
          }

          .suggestion-btn {
            padding: 8px;
            font-size: 11px;
          }

          /* Workflow extra small */
          .workflow-content {
            padding: 6px 10px;
          }

          .workflow-stats {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .workflow-item {
            padding: 10px;
          }

          .workflow-title {
            font-size: 13px;
          }

          .step {
            padding: 4px 6px;
            font-size: 11px;
          }

          /* IoT extra small */
          .iot-content {
            padding: 6px 10px;
          }

          .iot-card {
            padding: 10px;
          }

          .iot-card h3 {
            font-size: 13px;
          }

          .sensor-reading {
            padding: 4px 6px;
          }

          .reading-value {
            font-size: 14px;
          }

          .camera-placeholder {
            height: 50px;
            font-size: 18px;
          }
        }

          .analytics-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 16px;
          }

          .analytics-card {
            padding: 12px;
            border-radius: 8px;
          }

          .analytics-card h3 {
            font-size: 14px;
            margin-bottom: 12px;
          }

          .forecast-value .current,
          .forecast-value .projected {
            font-size: 20px;
          }

          .current-rate {
            font-size: 24px;
          }

          .trend {
            font-size: 14px;
          }

          .market-metrics .metric-item {
            padding: 6px 8px;
          }

          .heatmap-container {
            padding: 12px;
          }

          .heatmap-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 6px;
          }

          .heatmap-cell {
            padding: 12px;
            font-size: 12px;
          }

          /* Voice Modal Mobile Content Optimization */
          .voice-content {
            padding: 10px;
            flex: 1;
            overflow-y: auto;
            text-align: center;
          }

          .voice-circle {
            width: 60px;
            height: 60px;
            margin-bottom: 12px;
          }

          .voice-icon {
            font-size: 24px;
          }

          .voice-status {
            font-size: 12px;
            margin-bottom: 12px;
          }

          .voice-btn {
            padding: 8px 16px;
            font-size: 11px;
            margin-bottom: 16px;
          }

          .voice-commands h3 {
            font-size: 12px;
            margin-bottom: 8px;
            text-align: left;
          }

          .command-list {
            gap: 4px;
          }

          .command-item {
            padding: 6px;
            font-size: 10px;
            border-radius: 4px;
          }

          .voice-result {
            margin-top: 12px;
            padding: 8px;
            border-radius: 4px;
          }

          .voice-result h4 {
            font-size: 11px;
            margin-bottom: 4px;
          }

          .voice-result p {
            font-size: 10px;
          }

          /* Search Modal Mobile Content Optimization */
          .search-content {
            padding: 8px 10px;
            flex: 1;
            overflow-y: auto;
          }

          .search-interface {
            margin-bottom: 16px;
            gap: 6px;
          }

          .smart-search-input {
            padding: 8px 10px;
            font-size: 12px;
            border-radius: 6px;
          }

          .search-btn {
            padding: 8px 12px;
            font-size: 11px;
            white-space: nowrap;
          }

          .search-suggestions h3 {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .suggestion-grid {
            grid-template-columns: 1fr;
            gap: 4px;
            margin-bottom: 16px;
          }

          .suggestion-btn {
            padding: 8px;
            font-size: 10px;
            border-radius: 4px;
          }

          .search-results h3 {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .result-item {
            padding: 8px;
            gap: 8px;
            margin-bottom: 4px;
            border-radius: 4px;
          }

          .result-icon {
            font-size: 12px;
          }

          .result-text {
            font-size: 11px;
          }

          .result-count {
            font-size: 9px;
          }

          /* Workflow Modal Mobile Content Optimization */
          .workflow-content {
            padding: 6px 10px;
            flex: 1;
            overflow-y: auto;
          }

          .workflow-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
            margin-bottom: 12px;
          }

          .stat-card .stat-value {
            font-size: 16px;
            margin-bottom: 2px;
          }

          .stat-card .stat-label {
            font-size: 8px;
            line-height: 1.2;
          }

          .workflow-examples {
            margin-bottom: 12px;
          }

          .workflow-examples h3 {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .workflow-item {
            padding: 8px;
            margin-bottom: 8px;
            border-radius: 6px;
          }

          .workflow-header {
            gap: 6px;
            margin-bottom: 8px;
          }

          .workflow-icon {
            font-size: 14px;
          }

          .workflow-title {
            font-size: 11px;
            line-height: 1.3;
          }

          .workflow-status {
            padding: 2px 6px;
            font-size: 8px;
            border-radius: 8px;
          }

          .workflow-steps {
            gap: 4px;
            margin-bottom: 6px;
          }

          .step {
            padding: 4px 6px;
            font-size: 10px;
            border-radius: 4px;
          }

          .workflow-ai-optimization {
            padding: 6px;
            font-size: 9px;
            border-radius: 4px;
          }

          .workflow-triggers h3 {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .trigger-examples {
            gap: 6px;
          }

          .trigger-item {
            gap: 8px;
            padding: 6px 8px;
            font-size: 10px;
            border-radius: 4px;
          }

          .trigger-icon {
            font-size: 12px;
            width: 16px;
          }

          .trigger-desc {
            font-size: 10px;
          }

          .trigger-result {
            font-size: 9px;
            white-space: nowrap;
          }

          /* IoT Modal Mobile Content Optimization */
          .iot-content {
            padding: 6px 10px;
            flex: 1;
            overflow-y: auto;
          }

          .iot-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .iot-card {
            padding: 8px;
            border-radius: 6px;
          }

          .iot-card h3 {
            font-size: 11px;
            margin-bottom: 8px;
            font-weight: 600;
          }

          .sensor-reading {
            padding: 4px 6px;
            margin-bottom: 4px;
            border-radius: 4px;
          }

          .reading-value {
            font-size: 13px;
            font-weight: 700;
          }

          .reading-label {
            font-size: 9px;
          }

          .sensor-status {
            font-size: 8px;
            padding: 2px 4px;
            border-radius: 3px;
          }

          .progress-sensors {
            gap: 6px;
          }

          .progress-item {
            gap: 6px;
            font-size: 10px;
          }

          .progress-bar {
            height: 4px;
            border-radius: 2px;
          }

          .camera-grid {
            grid-template-columns: 1fr 1fr;
            gap: 6px;
            margin-bottom: 8px;
          }

          .camera-feed {
            text-align: center;
          }

          .camera-placeholder {
            height: 50px;
            font-size: 16px;
            margin-bottom: 4px;
            border-radius: 4px;
          }

          .camera-feed span {
            font-size: 9px;
          }

          .security-status {
            font-size: 9px;
          }

          .equipment-list {
            gap: 4px;
          }

          .equipment-item {
            gap: 6px;
            padding: 4px 6px;
            border-radius: 4px;
          }

          .equipment-icon {
            font-size: 12px;
          }

          .equipment-item span:nth-child(2) {
            font-size: 10px;
          }

          .location {
            font-size: 8px;
          }
        }

          .ai-activity-feed {
            margin-bottom: 16px;
            padding: 12px;
          }

          .ai-activity-feed h3 {
            font-size: 14px;
            margin-bottom: 12px;
          }

          .activity-stream {
            max-height: 200px;
            gap: 8px;
          }

          .activity-item {
            padding: 8px;
            gap: 8px;
          }

          .activity-time {
            min-width: 50px;
            font-size: 10px;
          }

          .activity-content {
            font-size: 12px;
          }

          .activity-result {
            font-size: 11px;
            margin-top: 3px;
          }

          .ai-hub-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 16px;
          }

          .ai-feature-card {
            padding: 12px;
            border-radius: 8px;
          }

          .feature-icon {
            width: 32px;
            height: 32px;
            font-size: 16px;
            margin-bottom: 8px;
          }

          .ai-feature-card h3 {
            font-size: 14px;
            margin-bottom: 6px;
          }

          .ai-feature-card p {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .feature-stats {
            grid-template-columns: 1fr 1fr;
            gap: 8px;
            margin: 8px 0;
          }

          .stat-item {
            padding: 6px;
          }

          .stat-value {
            font-size: 14px;
          }

          .stat-label {
            font-size: 9px;
          }

          .live-example {
            margin-top: 8px;
            padding: 8px;
          }

          .task-flow {
            gap: 4px;
            margin-bottom: 4px;
          }

          .task, .agent-from, .ai-decision, .agent-to {
            padding: 1px 4px;
            font-size: 10px;
          }

          .outcome {
            font-size: 10px;
          }

          .insights-grid {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .insight-card {
            padding: 12px;
          }

          .insight-card h4 {
            font-size: 13px;
            margin-bottom: 6px;
          }

          .insight-card p {
            font-size: 11px;
            margin-bottom: 8px;
          }

          .suggested-action {
            padding: 6px 8px;
            font-size: 10px;
            margin-bottom: 8px;
          }

          .action-btn {
            padding: 6px 12px;
            font-size: 11px;
          }

          .timeline-btn[data-view="milestones"]::before {
            content: "🎯";
            margin-right: 3px;
            font-size: 10px;
          }

          .timeline-btn[data-view="risks"]::before {
            content: "⚠️";
            margin-right: 3px;
            font-size: 10px;
          }

          .timeline-btn.ai-optimize::before {
            content: "🧠";
            margin-right: 3px;
            font-size: 10px;
          }

          .export-btn::before {
            content: "📤";
            margin-right: 3px;
            font-size: 10px;
          }

          /* Responsive timeline button text */
          .timeline-btn[data-view="gantt"] {
            position: relative;
          }

          .timeline-btn[data-view="milestones"] {
            position: relative;
          }

          .timeline-btn[data-view="risks"] {
            position: relative;
          }

          /* Ultra-compact mobile (≤375px) */
          @media (max-width: 375px) {
            .timeline-btn {
              padding: 4px 6px;
              font-size: 9px;
              min-width: 50px;
            }

            .timeline-btn span {
              display: none; /* Hide text on very small screens, show only icons */
            }

            .timeline-select {
              font-size: 9px;
              padding: 4px;
              min-width: 80px;
            }

            .timeline-btn.ai-optimize,
            .export-btn {
              padding: 4px 6px;
              font-size: 9px;
              min-width: 50px;
            }

            /* Show only icons on very small screens */
            .timeline-btn::after {
              display: none;
            }
          }

          .modal-header h2 {
            font-size: 15px;
          }

          .timeline-optimize-content,
          .export-content {
            padding: 6px 10px;
          }

          .optimization-stats {
            gap: 6px;
          }

          .opt-stat {
            min-width: 110px;
            padding: 10px;
          }

          .opt-value {
            font-size: 18px;
          }

          .opt-label {
            font-size: 9px;
          }

          .opt-suggestion-item {
            padding: 10px;
          }

          .suggestion-title {
            font-size: 13px;
          }

          .suggestion-desc {
            font-size: 11px;
          }

          .suggestion-benefit {
            font-size: 10px;
            padding: 4px 6px;
          }

          .apply-suggestion {
            padding: 6px 10px;
            font-size: 11px;
          }

          .timeline-before,
          .timeline-after {
            padding: 10px;
          }

          .timeline-phase {
            padding: 4px 6px;
            font-size: 10px;
          }

          .timeline-total {
            font-size: 12px;
          }

          .benefit-item {
            font-size: 11px;
          }

          /* Export Modal smaller mobile */
          .format-option {
            padding: 10px;
          }

          .format-name {
            font-size: 13px;
          }

          .format-desc {
            font-size: 10px;
          }

          .filter-group {
            padding: 10px;
          }

          .preview-content {
            padding: 10px;
          }

          .preview-header h4 {
            font-size: 13px;
          }

          .summary-item {
            font-size: 11px;
          }

          .section-item {
            font-size: 10px;
          }

          .export-btn {
            padding: 8px 12px;
            font-size: 12px;
          }

          .history-item {
            padding: 8px 10px;
          }

          .history-file {
            font-size: 11px;
          }

          .history-date {
            font-size: 9px;
          }
        }
        self.permits.append(permit)`
    }
  ];

  const timelineTasks: TimelineTask[] = [
    {
      id: 'task1',
      name: 'Building Permit Application',
      startDate: '2025-06-01',
      endDate: '2025-06-15',
      progress: 90,
      dependencies: [],
      assignedAgent: 'Jennifer',
      type: 'permit',
      critical: true
    },
    {
      id: 'task2',
      name: 'Architectural Plans Review',
      startDate: '2025-06-10',
      endDate: '2025-06-25',
      progress: 85,
      dependencies: ['task1'],
      assignedAgent: 'Sarah',
      type: 'planning',
      critical: true
    },
    {
      id: 'task3',
      name: 'Foundation Work',
      startDate: '2025-06-20',
      endDate: '2025-07-10',
      progress: 0,
      dependencies: ['task2'],
      assignedAgent: 'Mike',
      type: 'construction',
      critical: true
    },
    {
      id: 'task4',
      name: 'Electrical Inspection',
      startDate: '2025-07-15',
      endDate: '2025-07-18',
      progress: 0,
      dependencies: ['task3'],
      assignedAgent: 'Carlos',
      type: 'inspection',
      critical: false
    }
  ];

  const phases: Phase[] = [
    {
      id: '1',
      title: 'Property Acquisition',
      subtitle: 'Completed Jan 20',
      status: 'completed',
      startDate: '2025-01-15',
      endDate: '2025-01-20',
      assignedAgent: 'Reggie'
    },
    {
      id: '2',
      title: 'Due Diligence',
      subtitle: 'Completed Jan 25',
      status: 'completed',
      startDate: '2025-01-20',
      endDate: '2025-01-25',
      dependencies: ['1'],
      assignedAgent: 'Morty'
    },
    {
      id: '3',
      title: 'Design Development',
      subtitle: 'In Progress',
      status: 'active',
      progress: '85% Complete',
      startDate: '2025-02-01',
      endDate: '2025-06-30',
      dependencies: ['2'],
      assignedAgent: 'Aria'
    },
    {
      id: '4',
      title: 'Planning & Permits',
      subtitle: 'Pending',
      status: 'pending',
      startDate: '2025-06-01',
      endDate: '2025-07-15',
      dependencies: ['3'],
      assignedAgent: 'Zoe'
    },
    {
      id: '5',
      title: 'Construction',
      subtitle: 'Pending',
      status: 'pending',
      startDate: '2025-07-15',
      endDate: '2025-12-15',
      dependencies: ['4'],
      assignedAgent: 'Bea'
    },
    {
      id: '6',
      title: 'Final Approval',
      subtitle: 'Pending',
      status: 'pending',
      startDate: '2025-12-15',
      endDate: '2025-12-30',
      dependencies: ['5'],
      assignedAgent: 'Con'
    }
  ];

  const messages: Message[] = [
    {
      id: '1',
      sender: 'Morty',
      role: 'Loan Officer',
      content: "I'll help you analyze the Austin real estate market and provide mortgage calculations. I've completed the loan pre-approval for $640,000 at 6.75% interest rate. I'm now coordinating with @Reggie for property analysis and @Zoe for permit requirements.",
      status: 'OK',
      avatar: '🏦',
      timestamp: '2 min ago',
      type: 'mortgage'
    },
    {
      id: '2',
      sender: 'Aria',
      role: 'Architect',
      content: 'Currently analyzing comparable properties in the Austin area. Found 15 similar properties with average price of $585K. Market trends show 8% appreciation over the last year.',
      status: 'Thinking',
      avatar: '📐',
      timestamp: '5 min ago',
      type: 'architect'
    },
    {
      id: '3',
      sender: 'Reggie',
      role: 'Real Estate Agent',
      content: 'Currently analyzing comparable properties in the Austin area. Found 15 similar properties with average price of $585K. Market trends show 8% appreciation over the last year. Will have complete market analysis ready in 10 minutes.',
      status: 'Working',
      avatar: '🏠',
      timestamp: '8 min ago',
      type: 'realtor'
    },
    {
      id: '4',
      sender: 'Zoe',
      role: 'Zoning & Permitting',
      content: 'Permit applications are prepared and Austin building code compliance verified. Ready to submit once architectural plans are finalized.',
      status: 'Ready',
      avatar: '📋',
      timestamp: '15 min ago',
      type: 'zoning'
    }
  ];

  // Filter and sort agents
  const filteredAndSortedAgents = agents
    .filter(agent => filterStatus === 'all' || agent.status === filterStatus)
    .sort((a, b) => {
      switch (sortBy) {
        case 'completion': return b.completionRate - a.completionRate;
        case 'response': return a.responseTime - b.responseTime;
        case 'workload': return b.workload - a.workload;
        case 'efficiency': return b.efficiency - a.efficiency;
        default: return a.name.localeCompare(b.name);
      }
    });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'OK':
      case 'Ready':
        return '#22c55e';
      case 'Working':
        return '#f59e0b';
      case 'Thinking':
        return '#6b7280';
      default:
        return '#9ca3af';
    }
  };

  const getWorkloadColor = (workload: number) => {
    if (workload > 80) return '#ef4444';
    if (workload > 60) return '#f59e0b';
    return '#22c55e';
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'warning': return '#ef4444';
      case 'opportunity': return '#22c55e';
      case 'optimization': return '#3b82f6';
      case 'compliance': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning': return '⚠️';
      case 'opportunity': return '💡';
      case 'optimization': return '🎯';
      case 'compliance': return '📋';
      default: return 'ℹ️';
    }
  };

  const AgentCard: React.FC<{ agent: Agent }> = ({ agent }) => (
    <div 
      className={`agent-card ${agent.type} ${draggedAgent === agent.id ? 'dragging' : ''}`}
      draggable
      onDragStart={() => setDraggedAgent(agent.id)}
      onDragEnd={() => setDraggedAgent(null)}
      onClick={() => {
        setSelectedAgent(agent);
        setShowAgentModal(true);
      }}
    >
      {/* Smart Routing Indicator */}
      {agent.id === 'jennifer' && (
        <div className="smart-routing-badge">
          <span className="routing-icon">🎯</span>
          <span>Task routed from Alex</span>
        </div>
      )}

      {/* AI Optimization Badge */}
      {agent.id === 'sarah' && (
        <div className="ai-optimization-badge">
          <span className="opt-icon">⚡</span>
          <span>AI optimized: +62% speed</span>
        </div>
      )}

      <div className="agent-header">
        <div className={`agent-avatar ${agent.type}`}>
          {agent.avatar}
          {/* AI Activity Indicator */}
          {(agent.id === 'jennifer' || agent.id === 'sarah') && (
            <div className="ai-activity-indicator">
              <div className="ai-pulse"></div>
            </div>
          )}
        </div>
        <div className="agent-info">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3>{agent.name}</h3>
            <div className={`priority-badge ${agent.priority}`}>
              {agent.priority.toUpperCase()}
            </div>
            {/* AI Enhancement Badge */}
            {agent.efficiency > 90 && (
              <div className="ai-enhanced-badge">🧠 AI+</div>
            )}
          </div>
          <p className="agent-role">{agent.role}</p>
        </div>
        <div className="agent-controls">
          <button className="control-btn" onClick={(e) => { e.stopPropagation(); }}>⚙️</button>
          <button className="control-btn" onClick={(e) => { e.stopPropagation(); }}>💬</button>
        </div>
      </div>
      
      <div className={`agent-status ${agent.status}`}>
        <div className="status-dot"></div>
        <span>{agent.status === 'active' ? 'Active' : agent.status === 'working' ? 'Working' : agent.status === 'thinking' ? 'Thinking' : 'Standby'}</span>
        <div className="workload-indicator">
          <div 
            className="workload-bar"
            style={{ 
              width: `${agent.workload}%`,
              background: getWorkloadColor(agent.workload)
            }}
          ></div>
          <span className="workload-text">{agent.workload}%</span>
        </div>
      </div>

      {/* AI Orchestrator Actions */}
      {agent.id === 'jennifer' && (
        <div className="ai-action-alert">
          <div className="action-header">
            <span className="action-icon">🎯</span>
            <span className="action-title">Smart Routing Active</span>
          </div>
          <div className="action-details">
            Received "Austin mortgage analysis" from Alex (overloaded)
          </div>
          <div className="action-result">⚡ Est. completion: 45min vs 4hrs</div>
        </div>
      )}

      {agent.id === 'sarah' && (
        <div className="ai-optimization-alert">
          <div className="action-header">
            <span className="action-icon">⚡</span>
            <span className="action-title">AI Optimization Applied</span>
          </div>
          <div className="action-details">
            Code optimized: Parallel API calls implemented
          </div>
          <div className="action-result">🚀 Performance: 6.2s → 2.3s (62% faster)</div>
        </div>
      )}

      {agent.id === 'mike' && agent.workload < 30 && (
        <div className="ai-suggestion-alert">
          <div className="action-header">
            <span className="action-icon">💡</span>
            <span className="action-title">AI Suggestion</span>
          </div>
          <div className="action-details">
            Available to take 3 drafting tasks from Sarah
          </div>
          <div className="action-result">📊 Balance workload: Sarah 92%→78%</div>
        </div>
      )}
      
      <div className="agent-task">{agent.task}</div>
      
      <div className="agent-metrics">
        {agent.metrics.map((metric, index) => (
          <div key={index} className="metric">
            <div className="metric-value">{metric.value}</div>
            <div className="metric-label">{metric.label}</div>
          </div>
        ))}
      </div>
      
      <div className="agent-footer">
        <div className="performance-stats">
          <span>Response: {agent.responseTime}s</span>
          <span>Success: {agent.completionRate}%</span>
          <span>Efficiency: {agent.efficiency}%</span>
        </div>
        <div className="learning-progress">
          <span>Learning: {agent.learningProgress}%</span>
          <div className="learning-bar">
            <div style={{ width: `${agent.learningProgress}%` }}></div>
          </div>
        </div>
      </div>

      {/* AI Orchestrator Smart Routing Suggestion */}
      {smartRouting && agent.workload > 85 && (
        <div className="smart-routing-suggestion">
          <div className="suggestion-header">
            <span className="suggestion-icon">🧠</span>
            <span>AI Orchestrator Suggestion</span>
          </div>
          <div className="suggestion-content">
            Redistribute tasks to optimize workload
          </div>
          <button className="apply-suggestion-btn">Apply Optimization</button>
        </div>
      )}
    </div>
  );

  // Modal Components
  const CollaborateModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowCollaborateModal(false)}>
      <div className="modal-content collaborate-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🤝 Project Collaboration Center</h2>
          <div className="collaboration-status">
            <div className="online-count">5 members online</div>
          </div>
          <button onClick={() => setShowCollaborateModal(false)}>✕</button>
        </div>
        
        <div className="collaborate-content">
          <div className="collaboration-overview">
            <div className="collab-stats">
              <div className="collab-stat">
                <div className="stat-value">12</div>
                <div className="stat-label">Active Members</div>
              </div>
              <div className="collab-stat">
                <div className="stat-value">47</div>
                <div className="stat-label">Recent Changes</div>
              </div>
              <div className="collab-stat">
                <div className="stat-value">3</div>
                <div className="stat-label">Pending Invites</div>
              </div>
              <div className="collab-stat">
                <div className="stat-value">98%</div>
                <div className="stat-label">Sync Success</div>
              </div>
            </div>
          </div>
          
          <div className="team-members">
            <div className="members-header">
              <h3>👥 Team Members</h3>
              <button className="invite-btn">+ Invite Member</button>
            </div>
            <div className="members-list">
              {collaborationMembers.map(member => (
                <div key={member.id} className="member-item">
                  <div className="member-info">
                    <div className="member-avatar-container">
                      <div className="member-avatar">{member.avatar}</div>
                      <div className={`status-indicator ${member.status}`}></div>
                    </div>
                    <div className="member-details">
                      <div className="member-name">{member.name}</div>
                      <div className="member-role">{member.role}</div>
                      <div className="member-email">{member.email}</div>
                    </div>
                  </div>
                  <div className="member-meta">
                    <div className={`permission-badge ${member.permissions}`}>
                      {member.permissions.toUpperCase()}
                    </div>
                    <div className="last-active">{member.lastActive}</div>
                    <div className="member-actions">
                      <button className="action-btn">⚙️</button>
                      <button className="action-btn">💬</button>
                      <button className="action-btn">📧</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="collaboration-activity">
            <h3>📈 Recent Activity</h3>
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-time">2 min ago</div>
                <div className="activity-avatar">👨‍💼</div>
                <div className="activity-content">
                  <strong>John Mitchell</strong> updated budget projections in Financial Analysis
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-time">8 min ago</div>
                <div className="activity-avatar">👩‍🏗️</div>
                <div className="activity-content">
                  <strong>Sarah Chen</strong> completed architectural review for Phase 2
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-time">15 min ago</div>
                <div className="activity-avatar">👷‍♂️</div>
                <div className="activity-content">
                  <strong>Mike Rodriguez</strong> added comments to construction timeline
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-time">1 hour ago</div>
                <div className="activity-avatar">🤖</div>
                <div className="activity-content">
                  <strong>AI Orchestrator</strong> auto-optimized task assignments for 3 members
                </div>
              </div>
            </div>
          </div>
          
          <div className="collaboration-tools">
            <h3>🛠️ Collaboration Tools</h3>
            <div className="tools-grid">
              <div className="tool-card">
                <div className="tool-icon">💬</div>
                <div className="tool-content">
                  <h4>Real-time Chat</h4>
                  <p>Instant messaging with context-aware AI assistance</p>
                  <button className="tool-action">Open Chat</button>
                </div>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📝</div>
                <div className="tool-content">
                  <h4>Shared Notes</h4>
                  <p>Collaborative documentation with version control</p>
                  <button className="tool-action">View Notes</button>
                </div>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📹</div>
                <div className="tool-content">
                  <h4>Video Meetings</h4>
                  <p>Integrated video calls with screen sharing</p>
                  <button className="tool-action">Start Meeting</button>
                </div>
              </div>
              <div className="tool-card">
                <div className="tool-icon">📊</div>
                <div className="tool-content">
                  <h4>Shared Dashboards</h4>
                  <p>Real-time dashboard sharing and co-editing</p>
                  <button className="tool-action">Share Dashboard</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="collaboration-settings">
            <h3>⚙️ Collaboration Settings</h3>
            <div className="settings-grid">
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Real-time notifications
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  Auto-sync changes
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" />
                  Guest access allowed
                </label>
              </div>
              <div className="setting-item">
                <label>
                  <input type="checkbox" defaultChecked />
                  AI collaboration insights
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QuickExportModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowQuickExportModal(false)}>
      <div className="modal-content quick-export-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📤 Quick Export</h2>
          <button onClick={() => setShowQuickExportModal(false)}>✕</button>
        </div>
        
        <div className="quick-export-content">
          <div className="export-shortcuts">
            <h3>⚡ Quick Export Options</h3>
            <div className="shortcuts-grid">
              <div className="shortcut-card" onClick={() => alert('Exporting agent overview...')}>
                <div className="shortcut-icon">👥</div>
                <div className="shortcut-content">
                  <h4>Agent Overview</h4>
                  <p>Current status and metrics for all agents</p>
                  <span className="shortcut-format">PDF • 2 pages</span>
                </div>
              </div>
              
              <div className="shortcut-card" onClick={() => alert('Exporting project summary...')}>
                <div className="shortcut-icon">📊</div>
                <div className="shortcut-content">
                  <h4>Project Summary</h4>
                  <p>Budget, timeline, and progress overview</p>
                  <span className="shortcut-format">Excel • 1 sheet</span>
                </div>
              </div>
              
              <div className="shortcut-card" onClick={() => alert('Exporting task list...')}>
                <div className="shortcut-icon">✅</div>
                <div className="shortcut-content">
                  <h4>Active Tasks</h4>
                  <p>All pending and in-progress tasks</p>
                  <span className="shortcut-format">CSV • Real-time</span>
                </div>
              </div>
              
              <div className="shortcut-card" onClick={() => alert('Exporting AI insights...')}>
                <div className="shortcut-icon">🧠</div>
                <div className="shortcut-content">
                  <h4>AI Insights Report</h4>
                  <p>Latest AI recommendations and optimizations</p>
                  <span className="shortcut-format">PDF • 4 pages</span>
                </div>
              </div>
              
              <div className="shortcut-card" onClick={() => alert('Exporting financial data...')}>
                <div className="shortcut-icon">💰</div>
                <div className="shortcut-content">
                  <h4>Financial Dashboard</h4>
                  <p>Budget breakdown and cost analysis</p>
                  <span className="shortcut-format">Excel • 3 sheets</span>
                </div>
              </div>
              
              <div className="shortcut-card" onClick={() => alert('Exporting timeline...')}>
                <div className="shortcut-icon">📅</div>
                <div className="shortcut-content">
                  <h4>Project Timeline</h4>
                  <p>Gantt chart and milestone tracking</p>
                  <span className="shortcut-format">MS Project</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="export-presets">
            <h3>🎯 Preset Exports</h3>
            <div className="presets-list">
              <div className="preset-item">
                <div className="preset-info">
                  <h4>Weekly Status Report</h4>
                  <p>Complete project status for stakeholders</p>
                  <div className="preset-includes">
                    Includes: Agent metrics, budget status, timeline updates, AI insights
                  </div>
                </div>
                <button className="preset-export-btn">Export Weekly Report</button>
              </div>
              
              <div className="preset-item">
                <div className="preset-info">
                  <h4>Executive Summary</h4>
                  <p>High-level overview for management</p>
                  <div className="preset-includes">
                    Includes: Key metrics, budget variance, major milestones, risks
                  </div>
                </div>
                <button className="preset-export-btn">Export Executive Summary</button>
              </div>
              
              <div className="preset-item">
                <div className="preset-info">
                  <h4>Technical Documentation</h4>
                  <p>Detailed technical specifications and logs</p>
                  <div className="preset-includes">
                    Includes: Agent configurations, code deployments, performance logs
                  </div>
                </div>
                <button className="preset-export-btn">Export Technical Docs</button>
              </div>
            </div>
          </div>
          
          <div className="recent-exports">
            <h3>📚 Recent Quick Exports</h3>
            <div className="recent-list">
              <div className="recent-item">
                <span className="recent-icon">📊</span>
                <span className="recent-name">Project_Summary_June10.xlsx</span>
                <span className="recent-time">5 min ago</span>
                <button className="download-btn">⬇️</button>
              </div>
              <div className="recent-item">
                <span className="recent-icon">👥</span>
                <span className="recent-name">Agent_Overview_June10.pdf</span>
                <span className="recent-time">1 hour ago</span>
                <button className="download-btn">⬇️</button>
              </div>
              <div className="recent-item">
                <span className="recent-icon">🧠</span>
                <span className="recent-name">AI_Insights_Weekly.pdf</span>
                <span className="recent-time">2 days ago</span>
                <button className="download-btn">⬇️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ShareModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowShareModal(false)}>
      <div className="modal-content share-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🤝 Share Dashboard</h2>
          <button onClick={() => setShowShareModal(false)}>✕</button>
        </div>
        
        <div className="share-content">
          <div className="share-options">
            <h3>📤 Sharing Options</h3>
            <div className="share-methods">
              {shareOptions.map(option => (
                <div key={option.id} className="share-option-card">
                  <div className="share-option-header">
                    <div className="share-icon">{option.icon}</div>
                    <div className="share-option-info">
                      <h4>{option.title}</h4>
                      <p>{option.description}</p>
                    </div>
                  </div>
                  <div className="permission-selector">
                    <label>Permission Level:</label>
                    <select>
                      {option.permissions.map(perm => (
                        <option key={perm} value={perm}>
                          {perm.charAt(0).toUpperCase() + perm.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button className="share-action-btn">Share via {option.title}</button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="quick-share">
            <h3>⚡ Quick Share</h3>
            <div className="quick-share-form">
              <div className="share-input-group">
                <label>Email Address:</label>
                <div className="input-with-btn">
                  <input 
                    type="email" 
                    placeholder="colleague@company.com"
                    className="share-email-input"
                  />
                  <select className="permission-quick-select">
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button className="quick-invite-btn">Send Invite</button>
                </div>
              </div>
              
              <div className="share-link-section">
                <label>Shareable Link:</label>
                <div className="link-generator">
                  <input 
                    type="text" 
                    value="https://agent-dashboard.housei.com/project/austin-residential?token=abc123"
                    readOnly
                    className="share-link-input"
                  />
                  <button className="copy-link-btn" onClick={() => alert('Link copied to clipboard!')}>
                    📋 Copy
                  </button>
                </div>
                <div className="link-options">
                  <label>
                    <input type="checkbox" defaultChecked />
                    Require login
                  </label>
                  <label>
                    <input type="checkbox" />
                    Set expiration (7 days)
                  </label>
                  <label>
                    <input type="checkbox" defaultChecked />
                    Track access
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="shared-access">
            <h3>👥 Current Access</h3>
            <div className="access-list">
              <div className="access-item">
                <div className="access-user">
                  <div className="access-avatar">👨‍💼</div>
                  <div className="access-info">
                    <div className="access-name">John Mitchell</div>
                    <div className="access-email">john.mitchell@company.com</div>
                  </div>
                </div>
                <div className="access-permission">Admin</div>
                <div className="access-actions">
                  <button className="access-action">Change</button>
                  <button className="access-action">Remove</button>
                </div>
              </div>
              
              <div className="access-item">
                <div className="access-user">
                  <div className="access-avatar">👩‍🏗️</div>
                  <div className="access-info">
                    <div className="access-name">Sarah Chen</div>
                    <div className="access-email">sarah.chen@company.com</div>
                  </div>
                </div>
                <div className="access-permission">Editor</div>
                <div className="access-actions">
                  <button className="access-action">Change</button>
                  <button className="access-action">Remove</button>
                </div>
              </div>
              
              <div className="access-item">
                <div className="access-user">
                  <div className="access-avatar">👩‍💰</div>
                  <div className="access-info">
                    <div className="access-name">Lisa Wang</div>
                    <div className="access-email">lisa.wang@finance.com</div>
                  </div>
                </div>
                <div className="access-permission">Viewer</div>
                <div className="access-actions">
                  <button className="access-action">Change</button>
                  <button className="access-action">Remove</button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="sharing-insights">
            <h3>📊 Sharing Analytics</h3>
            <div className="insights-stats">
              <div className="insight-stat">
                <div className="stat-value">23</div>
                <div className="stat-label">Total Views Today</div>
              </div>
              <div className="insight-stat">
                <div className="stat-value">8</div>
                <div className="stat-label">Active Collaborators</div>
              </div>
              <div className="insight-stat">
                <div className="stat-value">15</div>
                <div className="stat-label">Shared Links</div>
              </div>
              <div className="insight-stat">
                <div className="stat-value">94%</div>
                <div className="stat-label">Access Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BudgetModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowBudgetModal(false)}>
      <div className="modal-content budget-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💰 Project Budget Analysis</h2>
          <button onClick={() => setShowBudgetModal(false)}>✕</button>
        </div>
        
        <div className="budget-content">
          <div className="budget-summary">
            <div className="summary-card total">
              <h3>Total Budget</h3>
              <div className="budget-amount">$1,005,000</div>
              <div className="budget-status">96.8% utilized</div>
            </div>
            <div className="summary-card variance">
              <h3>Total Variance</h3>
              <div className="variance-amount negative">-$43,300</div>
              <div className="variance-status">4.3% under budget</div>
            </div>
            <div className="summary-card forecast">
              <h3>AI Forecast</h3>
              <div className="forecast-amount">$961,700</div>
              <div className="forecast-confidence">92% confidence</div>
            </div>
          </div>
          
          <div className="budget-breakdown">
            <h3>💼 Budget Breakdown</h3>
            <div className="budget-table">
              <div className="table-header">
                <div>Category</div>
                <div>Budgeted</div>
                <div>Actual</div>
                <div>Variance</div>
                <div>Status</div>
              </div>
              {budgetData.map(item => (
                <div key={item.id} className="table-row">
                  <div className="category-name">{item.category}</div>
                  <div className="budgeted">${(item.budgeted / 1000).toFixed(0)}K</div>
                  <div className="actual">${(item.actual / 1000).toFixed(0)}K</div>
                  <div className={`variance ${item.variance < 0 ? 'negative' : 'positive'}`}>
                    {item.variance < 0 ? '-' : '+'}${Math.abs(item.variance / 1000).toFixed(1)}K
                  </div>
                  <div className={`status ${item.status}`}>
                    {item.status === 'on-track' ? '✅ On Track' : 
                     item.status === 'under-budget' ? '💰 Under' : '⚠️ Over'}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="ai-budget-insights">
            <h3>🧠 AI Budget Insights</h3>
            <div className="insights-grid">
              <div className="insight-card cost-saving">
                <div className="insight-icon">💡</div>
                <div className="insight-content">
                  <h4>Cost Optimization Opportunity</h4>
                  <p>Switch to alternative steel supplier could save $8,200 (5% on materials)</p>
                  <button className="insight-action">Apply Suggestion</button>
                </div>
              </div>
              <div className="insight-card risk-warning">
                <div className="insight-icon">⚠️</div>
                <div className="insight-content">
                  <h4>Labor Cost Risk</h4>
                  <p>Current labor costs 12.5% over budget. Consider renegotiating contracts</p>
                  <button className="insight-action">View Details</button>
                </div>
              </div>
              <div className="insight-card forecast">
                <div className="insight-icon">📈</div>
                <div className="insight-content">
                  <h4>Budget Forecast</h4>
                  <p>Project will finish $43K under budget with current trajectory</p>
                  <button className="insight-action">View Forecast</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TasksModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowTasksModal(false)}>
      <div className="modal-content tasks-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✅ Task Management Center</h2>
          <button onClick={() => setShowTasksModal(false)}>✕</button>
        </div>
        
        <div className="tasks-content">
          <div className="tasks-overview">
            <div className="task-stats">
              <div className="stat-card">
                <div className="stat-number">6</div>
                <div className="stat-label">Total Tasks</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">2</div>
                <div className="stat-label">In Progress</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">1</div>
                <div className="stat-label">Completed</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">3</div>
                <div className="stat-label">Pending</div>
              </div>
            </div>
            
            <div className="task-filters">
              <select className="filter-select">
                <option>All Tasks</option>
                <option>High Priority</option>
                <option>In Progress</option>
                <option>Overdue</option>
              </select>
              <select className="filter-select">
                <option>All Agents</option>
                <option>Jennifer</option>
                <option>Sarah</option>
                <option>David</option>
                <option>Mike</option>
                <option>Carlos</option>
                <option>Alex</option>
              </select>
              <button className="add-task-btn">+ Add Task</button>
            </div>
          </div>
          
          <div className="tasks-list">
            {tasksData.map(task => (
              <div key={task.id} className={`task-item ${task.priority}`}>
                <div className="task-main">
                  <div className="task-header">
                    <div className="task-title">{task.title}</div>
                    <div className={`task-priority ${task.priority}`}>
                      {task.priority.toUpperCase()}
                    </div>
                    <div className={`task-status ${task.status}`}>
                      {task.status.replace('-', ' ').toUpperCase()}
                    </div>
                  </div>
                  <div className="task-description">{task.description}</div>
                  <div className="task-meta">
                    <div className="task-assignee">👤 {task.assignedTo}</div>
                    <div className="task-due">📅 Due: {task.dueDate}</div>
                    <div className="task-time">⏱️ {task.actualHours}h / {task.estimatedHours}h</div>
                  </div>
                </div>
                <div className="task-progress-section">
                  <div className="progress-label">{task.progress}% Complete</div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${task.progress}%` }}
                    ></div>
                  </div>
                  <div className="task-actions">
                    <button className="task-action">Edit</button>
                    <button className="task-action">🤖 AI Assist</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="ai-task-insights">
            <h3>🧠 AI Task Insights</h3>
            <div className="task-insights-grid">
              <div className="task-insight">
                <span className="insight-icon">⚡</span>
                <span>Jennifer can complete permit task 2 days early with AI assistance</span>
              </div>
              <div className="task-insight">
                <span className="insight-icon">🔄</span>
                <span>3 tasks can be parallelized to save 5 days overall</span>
              </div>
              <div className="task-insight">
                <span className="insight-icon">⚠️</span>
                <span>Insurance task blocked - requires permit approval first</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TimelineAIOptimizeModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowTimelineAIOptimize(false)}>
      <div className="modal-content timeline-optimize-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🧠 Timeline AI Optimization</h2>
          <button onClick={() => setShowTimelineAIOptimize(false)}>✕</button>
        </div>
        
        <div className="timeline-optimize-content">
          <div className="optimization-overview">
            <h3>🎯 Optimization Opportunities</h3>
            <div className="optimization-stats">
              <div className="opt-stat">
                <div className="opt-value">23 days</div>
                <div className="opt-label">Time Savings</div>
              </div>
              <div className="opt-stat">
                <div className="opt-value">$31K</div>
                <div className="opt-label">Cost Reduction</div>
              </div>
              <div className="opt-stat">
                <div className="opt-value">94%</div>
                <div className="opt-label">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="optimization-suggestions">
            <h3>💡 AI Optimization Suggestions</h3>
            <div className="opt-suggestions-list">
              <div className="opt-suggestion-item high">
                <div className="suggestion-header">
                  <span className="suggestion-icon">⚡</span>
                  <span className="suggestion-title">Parallel Processing</span>
                  <span className="impact high">High Impact</span>
                </div>
                <div className="suggestion-desc">
                  Run permit approval and architectural review simultaneously instead of sequentially
                </div>
                <div className="suggestion-benefit">
                  💰 Saves 12 days | $18K cost reduction
                </div>
                <button className="apply-suggestion">Apply Optimization</button>
              </div>
              
              <div className="opt-suggestion-item medium">
                <div className="suggestion-header">
                  <span className="suggestion-icon">📅</span>
                  <span className="suggestion-title">Resource Reallocation</span>
                  <span className="impact medium">Medium Impact</span>
                </div>
                <div className="suggestion-desc">
                  Move 2 drafting tasks from Sarah to Mike to balance workload
                </div>
                <div className="suggestion-benefit">
                  ⏱️ Saves 8 days | Improves efficiency by 34%
                </div>
                <button className="apply-suggestion">Apply Optimization</button>
              </div>
              
              <div className="opt-suggestion-item medium">
                <div className="suggestion-header">
                  <span className="suggestion-icon">🌤️</span>
                  <span className="suggestion-title">Weather Optimization</span>
                  <span className="impact medium">Medium Impact</span>
                </div>
                <div className="suggestion-desc">
                  Start foundation work 1 week earlier to avoid rainy season
                </div>
                <div className="suggestion-benefit">
                  🌧️ Avoids 3-day weather delay | $5K savings
                </div>
                <button className="apply-suggestion">Apply Optimization</button>
              </div>
              
              <div className="opt-suggestion-item low">
                <div className="suggestion-header">
                  <span className="suggestion-icon">🚚</span>
                  <span className="suggestion-title">Supply Chain Optimization</span>
                  <span className="impact low">Low Impact</span>
                </div>
                <div className="suggestion-desc">
                  Bulk order materials for phases 2-3 together for volume discount
                </div>
                <div className="suggestion-benefit">
                  💵 $8K material cost savings | No time impact
                </div>
                <button className="apply-suggestion">Apply Optimization</button>
              </div>
            </div>
          </div>
          
          <div className="optimization-impact">
            <h3>📊 Projected Impact</h3>
            <div className="impact-comparison">
              <div className="timeline-before">
                <h4>Current Timeline</h4>
                <div className="timeline-bar current">
                  <div className="timeline-phase">Phase 1: 45 days</div>
                  <div className="timeline-phase">Phase 2: 60 days</div>
                  <div className="timeline-phase">Phase 3: 30 days</div>
                </div>
                <div className="timeline-total">Total: 135 days</div>
              </div>
              <div className="timeline-after">
                <h4>Optimized Timeline</h4>
                <div className="timeline-bar optimized">
                  <div className="timeline-phase">Phase 1: 35 days</div>
                  <div className="timeline-phase">Phase 2: 50 days</div>
                  <div className="timeline-phase">Phase 3: 27 days</div>
                </div>
                <div className="timeline-total">Total: 112 days</div>
              </div>
            </div>
            <div className="optimization-benefits">
              <div className="benefit-item">
                <span className="benefit-icon">⏱️</span>
                <span>23 days faster completion</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">💰</span>
                <span>$31,000 cost savings</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">📈</span>
                <span>17% efficiency improvement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ExportModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
      <div className="modal-content export-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📤 Export Timeline Data</h2>
          <button onClick={() => setShowExportModal(false)}>✕</button>
        </div>
        
        <div className="export-content">
          <div className="export-options">
            <h3>📋 Export Options</h3>
            <div className="export-formats">
              <div className="format-option">
                <input type="checkbox" id="pdf" defaultChecked />
                <label htmlFor="pdf">
                  <span className="format-icon">📄</span>
                  <span className="format-name">PDF Report</span>
                  <span className="format-desc">Comprehensive timeline with visualizations</span>
                </label>
              </div>
              <div className="format-option">
                <input type="checkbox" id="excel" defaultChecked />
                <label htmlFor="excel">
                  <span className="format-icon">📊</span>
                  <span className="format-name">Excel Spreadsheet</span>
                  <span className="format-desc">Detailed task data and scheduling</span>
                </label>
              </div>
              <div className="format-option">
                <input type="checkbox" id="project" />
                <label htmlFor="project">
                  <span className="format-icon">📈</span>
                  <span className="format-name">MS Project File</span>
                  <span className="format-desc">Full project management format</span>
                </label>
              </div>
              <div className="format-option">
                <input type="checkbox" id="json" />
                <label htmlFor="json">
                  <span className="format-icon">💾</span>
                  <span className="format-name">JSON Data</span>
                  <span className="format-desc">Raw data for system integration</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="export-filters">
            <h3>🔍 Data Filters</h3>
            <div className="filter-options">
              <div className="filter-group">
                <label>Date Range:</label>
                <select>
                  <option>All Dates</option>
                  <option>Next 30 Days</option>
                  <option>Next 90 Days</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Task Status:</label>
                <select>
                  <option>All Tasks</option>
                  <option>Active Only</option>
                  <option>Critical Path</option>
                  <option>At Risk</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Detail Level:</label>
                <select>
                  <option>Summary</option>
                  <option>Detailed</option>
                  <option>Full Report</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="export-preview">
            <h3>👁️ Export Preview</h3>
            <div className="preview-content">
              <div className="preview-header">
                <h4>Agent Dashboard - Timeline Report</h4>
                <div className="preview-date">Generated: June 10, 2025</div>
              </div>
              <div className="preview-summary">
                <div className="summary-item">Project: Austin Residential Project</div>
                <div className="summary-item">Total Tasks: 24</div>
                <div className="summary-item">Timeline: 112 days (optimized)</div>
                <div className="summary-item">Budget: $1,005,000</div>
              </div>
              <div className="preview-sections">
                <div className="section-item">✓ Executive Summary</div>
                <div className="section-item">✓ Timeline Overview</div>
                <div className="section-item">✓ Task Details</div>
                <div className="section-item">✓ Resource Allocation</div>
                <div className="section-item">✓ Risk Analysis</div>
                <div className="section-item">✓ AI Insights</div>
              </div>
            </div>
          </div>
          
          <div className="export-actions">
            <button className="export-btn preview">👁️ Preview Export</button>
            <button className="export-btn generate">📤 Generate Export</button>
            <button className="export-btn schedule">📅 Schedule Regular Export</button>
          </div>
          
          <div className="export-history">
            <h3>📚 Recent Exports</h3>
            <div className="history-list">
              <div className="history-item">
                <span className="history-file">Timeline_Report_June_2025.pdf</span>
                <span className="history-date">2 days ago</span>
                <button className="download-btn">⬇️</button>
              </div>
              <div className="history-item">
                <span className="history-file">Project_Data_Export.xlsx</span>
                <span className="history-date">5 days ago</span>
                <button className="download-btn">⬇️</button>
              </div>
              <div className="history-item">
                <span className="history-file">Austin_Project_Summary.pdf</span>
                <span className="history-date">1 week ago</span>
                <button className="download-btn">⬇️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SmartRoutingPanel: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowSmartRoutingPanel(false)}>
      <div className="modal-content smart-routing-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🎯 Smart Routing Control Center</h2>
          <div className="routing-status active">
            <div className="status-dot"></div>
            <span>ACTIVE</span>
          </div>
          <button onClick={() => setShowSmartRoutingPanel(false)}>✕</button>
        </div>
        
        <div className="smart-routing-content">
          <div className="routing-overview">
            <div className="routing-stats">
              <div className="routing-stat">
                <div className="stat-value">47</div>
                <div className="stat-label">Tasks Routed Today</div>
              </div>
              <div className="routing-stat">
                <div className="stat-value">67%</div>
                <div className="stat-label">Efficiency Gain</div>
              </div>
              <div className="routing-stat">
                <div className="stat-value">12.3h</div>
                <div className="stat-label">Time Saved</div>
              </div>
              <div className="routing-stat">
                <div className="stat-value">$8.2K</div>
                <div className="stat-label">Cost Savings</div>
              </div>
            </div>
          </div>
          
          <div className="live-routing-feed">
            <h3>🔴 Live Routing Activity</h3>
            <div className="routing-events">
              {smartRoutingEvents.map(event => (
                <div key={event.id} className="routing-event">
                  <div className="event-time">{event.timestamp}</div>
                  <div className="event-details">
                    <div className="event-header">
                      <span className="event-icon">🎯</span>
                      <span className="event-type">{event.taskType}</span>
                      <span className="efficiency-badge">+{event.efficiency}%</span>
                    </div>
                    <div className="routing-flow">
                      <span className="from-agent">{event.fromAgent}</span>
                      <span className="routing-arrow">→</span>
                      <span className="to-agent">{event.toAgent}</span>
                    </div>
                    <div className="event-reason">
                      <span className="reason-label">Reason:</span>
                      <span className="reason-text">{event.reason}</span>
                    </div>
                    <div className="event-benefit">
                      ⏱️ Saved: {event.timeSaved}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="routing-controls">
            <h3>⚙️ Routing Configuration</h3>
            <div className="control-groups">
              <div className="control-group">
                <label>Routing Strategy:</label>
                <select defaultValue="balanced">
                  <option value="workload">Workload Balancing</option>
                  <option value="skill">Skill-Based Routing</option>
                  <option value="balanced">Balanced Optimization</option>
                  <option value="cost">Cost Minimization</option>
                  <option value="speed">Speed Optimization</option>
                </select>
              </div>
              <div className="control-group">
                <label>Routing Sensitivity:</label>
                <div className="slider-container">
                  <input type="range" min="1" max="10" defaultValue="7" />
                  <div className="slider-labels">
                    <span>Conservative</span>
                    <span>Aggressive</span>
                  </div>
                </div>
              </div>
              <div className="control-group">
                <label>Auto-Routing Threshold:</label>
                <select defaultValue="75">
                  <option value="60">60% workload</option>
                  <option value="75">75% workload</option>
                  <option value="85">85% workload</option>
                  <option value="90">90% workload</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="routing-rules">
            <h3>📋 Active Routing Rules</h3>
            <div className="rules-list">
              <div className="rule-item">
                <div className="rule-condition">If agent workload > 85%</div>
                <div className="rule-action">→ Route new tasks to available agents</div>
                <div className="rule-status active">Active</div>
              </div>
              <div className="rule-item">
                <div className="rule-condition">If task requires specific skill</div>
                <div className="rule-action">→ Route to specialist regardless of workload</div>
                <div className="rule-status active">Active</div>
              </div>
              <div className="rule-item">
                <div className="rule-condition">If urgent priority task</div>
                <div className="rule-action">→ Preempt current tasks if necessary</div>
                <div className="rule-status active">Active</div>
              </div>
              <div className="rule-item">
                <div className="rule-condition">If agent offline > 15 minutes</div>
                <div className="rule-action">→ Redistribute pending tasks</div>
                <div className="rule-status paused">Paused</div>
              </div>
            </div>
            <button className="add-rule-btn">+ Add Custom Rule</button>
          </div>
          
          <div className="routing-analytics">
            <h3>📊 Routing Performance</h3>
            <div className="analytics-chart">
              <div className="chart-header">
                <span>Routing Efficiency Over Time</span>
                <select>
                  <option>Last 24 Hours</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                </select>
              </div>
              <div className="efficiency-chart">
                <div className="chart-bars">
                  <div className="bar" style={{ height: '60%' }}>
                    <span className="bar-value">60%</span>
                  </div>
                  <div className="bar" style={{ height: '72%' }}>
                    <span className="bar-value">72%</span>
                  </div>
                  <div className="bar" style={{ height: '68%' }}>
                    <span className="bar-value">68%</span>
                  </div>
                  <div className="bar" style={{ height: '75%' }}>
                    <span className="bar-value">75%</span>
                  </div>
                  <div className="bar" style={{ height: '82%' }}>
                    <span className="bar-value">82%</span>
                  </div>
                  <div className="bar" style={{ height: '78%' }}>
                    <span className="bar-value">78%</span>
                  </div>
                  <div className="bar" style={{ height: '85%' }}>
                    <span className="bar-value">85%</span>
                  </div>
                </div>
                <div className="chart-labels">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AIHubModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowAIHub(false)}>
      <div className="modal-content ai-hub-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🧠 AI Orchestrator Hub</h2>
          <div className="ai-status-live">
            <div className="live-indicator"></div>
            <span>LIVE</span>
          </div>
          <button onClick={() => setShowAIHub(false)}>✕</button>
        </div>
        
        <div className="ai-hub-content">
          {/* Real-time AI Activity Feed */}
          <div className="ai-activity-feed">
            <h3>🔴 Live AI Orchestrator Activity</h3>
            <div className="activity-stream">
              <div className="activity-item active">
                <div className="activity-time">Just now</div>
                <div className="activity-icon">🎯</div>
                <div className="activity-content">
                  <strong>Smart Routing:</strong> Redirected "Austin mortgage analysis" from Morty (92% busy) to Zoe (23% busy) + Reggie's market data
                  <div className="activity-result">⚡ 4.2hrs → 45min completion time</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-time">2 min ago</div>
                <div className="activity-icon">⚡</div>
                <div className="activity-content">
                  <strong>AI Optimize:</strong> Applied async processing to Aria's code - parallel API calls implemented
                  <div className="activity-result">🚀 62% performance improvement (6.2s → 2.3s)</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-time">5 min ago</div>
                <div className="activity-icon">⚖️</div>
                <div className="activity-content">
                  <strong>Conflict Resolution:</strong> Mortgage term dispute resolved - suggested 20-year compromise
                  <div className="activity-result">💰 Saves $89K vs 30-year, fits $3,200 budget</div>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-time">8 min ago</div>
                <div className="activity-icon">🔄</div>
                <div className="activity-content">
                  <strong>Workload Balancing:</strong> Redistributed 3 drafting tasks from Aria to Bea
                  <div className="activity-result">📊 Aria: 92% → 78% | Bea: 23% → 45%</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Feature Controls with Live Stats */}
          <div className="ai-hub-grid">
            <div className="ai-feature-card smart-routing">
              <div className="feature-icon">🎯</div>
              <h3>Smart Agent Routing</h3>
              <p>AI automatically assigns tasks to optimal agents</p>
              <div className="feature-stats">
                <div className="stat-item">
                  <span className="stat-value">23</span>
                  <span className="stat-label">Tasks routed today</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">67%</span>
                  <span className="stat-label">Efficiency gain</span>
                </div>
              </div>
              <div className="feature-toggle">
                <input 
                  type="checkbox" 
                  checked={smartRouting} 
                  onChange={() => setSmartRouting(!smartRouting)}
                />
                <span>Enabled</span>
              </div>
              <div className="live-example">
                <div className="routing-example">
                  <div className="task-flow">
                    <span className="task">📋 Mortgage Analysis</span>
                    <span className="arrow">→</span>
                    <span className="agent-from">Alex (92% busy)</span>
                    <span className="ai-decision">🧠 AI</span>
                    <span className="agent-to">Jennifer (23% busy)</span>
                  </div>
                  <div className="outcome">Result: 4hrs → 45min</div>
                </div>
              </div>
            </div>
            
            <div className="ai-feature-card auto-scaling">
              <div className="feature-icon">🔄</div>
              <h3>AI Optimize Engine</h3>
              <p>Continuously optimizes code, timelines, and resources</p>
              <div className="feature-stats">
                <div className="stat-item">
                  <span className="stat-value">8</span>
                  <span className="stat-label">Code optimizations</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">$18K</span>
                  <span className="stat-label">Cost savings</span>
                </div>
              </div>
              <div className="feature-toggle">
                <input type="checkbox" defaultChecked />
                <span>Active</span>
              </div>
              <div className="optimization-examples">
                <div className="opt-example">
                  <span className="opt-type">⚡ Code:</span>
                  <span className="opt-result">62% faster execution</span>
                </div>
                <div className="opt-example">
                  <span className="opt-type">📅 Timeline:</span>
                  <span className="opt-result">2 weeks saved</span>
                </div>
              </div>
            </div>
            
            <div className="ai-feature-card learning">
              <div className="feature-icon">🧠</div>
              <h3>Cross-Agent Learning</h3>
              <p>Agents share knowledge and improve collectively</p>
              <div className="learning-network">
                <div className="agent-node">Alex</div>
                <div className="knowledge-flow">📊</div>
                <div className="agent-node">Emma</div>
                <div className="knowledge-flow">🔄</div>
                <div className="agent-node">Sarah</div>
              </div>
              <div className="feature-toggle">
                <input type="checkbox" defaultChecked />
                <span>Learning</span>
              </div>
              <div className="learning-stats">
                Knowledge shared: 47 insights today
              </div>
            </div>
            
            <div className="ai-feature-card conflict-resolution">
              <div className="feature-icon">⚖️</div>
              <h3>Conflict Resolution</h3>
              <p>AI mediates when agents have conflicting recommendations</p>
              <div className="conflict-example">
                <div className="conflict-agents">
                  <span className="agent-opinion">Alex: 30yr @ 6.75%</span>
                  <span className="vs">VS</span>
                  <span className="agent-opinion">Emma: 15yr @ 6.25%</span>
                </div>
                <div className="ai-solution">
                  <span className="solution-icon">🤖</span>
                  <span>AI Solution: 20yr @ 6.5%</span>
                </div>
              </div>
              <div className="feature-toggle">
                <input type="checkbox" defaultChecked />
                <span>Monitoring</span>
              </div>
            </div>
          </div>

          {/* AI Orchestrator Performance Dashboard */}
          <div className="orchestrator-dashboard">
            <h3>📊 AI Orchestrator Performance</h3>
            <div className="perf-metrics-grid">
              <div className="perf-metric-card">
                <div className="metric-header">
                  <span className="metric-icon">⚡</span>
                  <span className="metric-title">Response Time</span>
                </div>
                <div className="metric-value">2.3s</div>
                <div className="metric-change positive">-62% from yesterday</div>
                <div className="metric-chart">
                  <div className="chart-bar" style={{ height: '40%' }}></div>
                  <div className="chart-bar" style={{ height: '60%' }}></div>
                  <div className="chart-bar" style={{ height: '45%' }}></div>
                  <div className="chart-bar" style={{ height: '38%' }}></div>
                </div>
              </div>

              <div className="perf-metric-card">
                <div className="metric-header">
                  <span className="metric-icon">🎯</span>
                  <span className="metric-title">Task Accuracy</span>
                </div>
                <div className="metric-value">96.7%</div>
                <div className="metric-change positive">+2.1% this week</div>
                <div className="accuracy-breakdown">
                  <div className="accuracy-item">
                    <span>Routing</span>
                    <span>98.2%</span>
                  </div>
                  <div className="accuracy-item">
                    <span>Optimization</span>
                    <span>95.1%</span>
                  </div>
                </div>
              </div>

              <div className="perf-metric-card">
                <div className="metric-header">
                  <span className="metric-icon">💰</span>
                  <span className="metric-title">Cost Savings</span>
                </div>
                <div className="metric-value">$42.3K</div>
                <div className="metric-change positive">This month</div>
                <div className="savings-breakdown">
                  <div className="savings-item">
                    <span>Time optimization</span>
                    <span>$18.5K</span>
                  </div>
                  <div className="savings-item">
                    <span>Resource efficiency</span>
                    <span>$23.8K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="ai-insights-section-redesign">
            <div className="insights-header-redesign">
              <div className="insights-title-container">
                <h3>🔍 AI Insights & Recommendations</h3>
                <div className="insights-stats-mini">
                  <span className="stat-pill">4 Active Insights</span>
                  <span className="stat-pill priority">2 High Priority</span>
                </div>
              </div>
              <div className="insights-controls">
                <button className="insights-filter-btn">
                  <span className="filter-icon">⚡</span>
                  High Impact
                </button>
                <button className="insights-refresh-btn">
                  <span className="refresh-icon">🔄</span>
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="insights-content-redesign">
              <div className="insights-priority-section">
                <div className="priority-header">
                  <span className="priority-indicator high-priority">🚨</span>
                  <span className="priority-label">Critical Actions Required</span>
                  <span className="priority-count">2</span>
                </div>
                
                <div className="priority-insights">
                  {aiInsights.filter(insight => insight.impact === 'high').map(insight => (
                    <div key={insight.id} className={`insight-card-redesign priority-card ${insight.type}`}>
                      <div className="insight-card-header">
                        <div className="insight-type-badge">
                          <span className="type-icon">{getInsightIcon(insight.type)}</span>
                          <span className="type-label">{insight.type.toUpperCase()}</span>
                        </div>
                        <div className="insight-urgency">
                          <span className="urgency-dot high"></span>
                          <span className="urgency-text">HIGH IMPACT</span>
                        </div>
                      </div>
                      
                      <div className="insight-content-redesign">
                        <h4 className="insight-title-redesign">{insight.title}</h4>
                        <p className="insight-description-redesign">{insight.description}</p>
                        
                        {insight.suggested_action && (
                          <div className="suggested-action-redesign">
                            <div className="action-icon">💡</div>
                            <div className="action-text">{insight.suggested_action}</div>
                          </div>
                        )}
                        
                        <div className="insight-metrics">
                          <div className="metric-item">
                            <span className="metric-label">Estimated Impact</span>
                            <span className="metric-value">$18K+ savings</span>
                          </div>
                          <div className="metric-item">
                            <span className="metric-label">Time to Implement</span>
                            <span className="metric-value">2-3 days</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="insight-actions-redesign">
                        <button className="action-btn-primary">
                          <span className="btn-icon">⚡</span>
                          Take Action Now
                        </button>
                        <button className="action-btn-secondary">
                          <span className="btn-icon">📋</span>
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="insights-standard-section">
                <div className="standard-header">
                  <span className="standard-indicator">📊</span>
                  <span className="standard-label">Additional Recommendations</span>
                  <span className="standard-count">{aiInsights.filter(insight => insight.impact !== 'high').length}</span>
                </div>
                
                <div className="standard-insights-grid">
                  {aiInsights.filter(insight => insight.impact !== 'high').map(insight => (
                    <div key={insight.id} className={`insight-card-compact ${insight.type}`}>
                      <div className="compact-header">
                        <div className="compact-type">
                          <span className="compact-icon">{getInsightIcon(insight.type)}</span>
                          <span className="compact-title">{insight.title}</span>
                        </div>
                        <div className={`compact-impact ${insight.impact}`}>
                          {insight.impact.toUpperCase()}
                        </div>
                      </div>
                      
                      <p className="compact-description">{insight.description}</p>
                      
                      <div className="compact-actions">
                        <button className="compact-action-btn">
                          <span className="compact-btn-icon">👁️</span>
                          Review
                        </button>
                        {insight.actionable && (
                          <button className="compact-action-btn primary">
                            <span className="compact-btn-icon">✅</span>
                            Apply
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="insights-summary-bar">
                <div className="summary-stats">
                  <div className="summary-stat">
                    <span className="summary-icon">💰</span>
                    <div className="summary-details">
                      <span className="summary-value">$31K</span>
                      <span className="summary-label">Potential Savings</span>
                    </div>
                  </div>
                  <div className="summary-stat">
                    <span className="summary-icon">⏱️</span>
                    <div className="summary-details">
                      <span className="summary-value">23 days</span>
                      <span className="summary-label">Time Reduction</span>
                    </div>
                  </div>
                  <div className="summary-stat">
                    <span className="summary-icon">📈</span>
                    <div className="summary-details">
                      <span className="summary-value">94%</span>
                      <span className="summary-label">Success Rate</span>
                    </div>
                  </div>
                </div>
                <button className="view-all-insights-btn">
                  <span className="view-all-icon">📊</span>
                  View Full Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const PredictiveAnalyticsModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowPredictiveAnalytics(false)}>
      <div className="modal-content analytics-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📊 Predictive Analytics Dashboard</h2>
          <button onClick={() => setShowPredictiveAnalytics(false)}>✕</button>
        </div>
        
        <div className="analytics-content">
          <div className="analytics-grid">
            <div className="analytics-card">
              <h3>🏠 Property Value Forecast</h3>
              <div className="forecast-value">
                <span className="current">${(predictiveData.propertyValue.current / 1000).toFixed(0)}K</span>
                <span className="arrow">→</span>
                <span className="projected">${(predictiveData.propertyValue.projected / 1000).toFixed(0)}K</span>
              </div>
              <div className="confidence">
                Confidence: {predictiveData.propertyValue.confidence}%
              </div>
              <div className="trend-chart">
                <div className="chart-bar" style={{ height: '60%' }}></div>
                <div className="chart-bar" style={{ height: '75%' }}></div>
                <div className="chart-bar" style={{ height: '85%' }}></div>
                <div className="chart-bar" style={{ height: '100%' }}></div>
              </div>
            </div>
            
            <div className="analytics-card">
              <h3>📈 Interest Rate Trends</h3>
              <div className="rate-display">
                <span className="current-rate">{predictiveData.interestRates.current}%</span>
                <span className={`trend ${predictiveData.interestRates.trend}`}>
                  {predictiveData.interestRates.trend === 'up' ? '↗️' : predictiveData.interestRates.trend === 'down' ? '↘️' : '→'}
                  {predictiveData.interestRates.projected}%
                </span>
              </div>
              <div className="rate-impact">
                Impact on monthly payment: +$247
              </div>
            </div>
            
            <div className="analytics-card">
              <h3>🏗️ Construction Cost Analysis</h3>
              <div className="cost-breakdown">
                <div className="cost-item">
                  <span>Current: ${(predictiveData.constructionCosts.current / 1000).toFixed(0)}K</span>
                  <span>Projected: ${(predictiveData.constructionCosts.projected / 1000).toFixed(0)}K</span>
                </div>
                <div className={`volatility ${predictiveData.constructionCosts.volatility}`}>
                  Volatility: {predictiveData.constructionCosts.volatility}
                </div>
              </div>
            </div>
            
            <div className="analytics-card">
              <h3>📊 Market Health Index</h3>
              <div className="market-metrics">
                <div className="metric-item">
                  <span>Appreciation</span>
                  <span className="metric-value">{predictiveData.marketTrends.appreciation}%</span>
                </div>
                <div className="metric-item">
                  <span>Demand Index</span>
                  <span className="metric-value">{predictiveData.marketTrends.demandIndex}/100</span>
                </div>
                <div className="metric-item">
                  <span>Supply Index</span>
                  <span className="metric-value">{predictiveData.marketTrends.supplyIndex}/100</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="risk-heatmap-section">
            <h3>🗺️ Risk Heatmap</h3>
            <div className="heatmap-container">
              <div className="heatmap-legend">
                <span className="legend-item low">Low Risk</span>
                <span className="legend-item medium">Medium Risk</span>
                <span className="legend-item high">High Risk</span>
              </div>
              <div className="heatmap-grid">
                <div className="heatmap-cell low">Weather</div>
                <div className="heatmap-cell medium">Permits</div>
                <div className="heatmap-cell high">Labor</div>
                <div className="heatmap-cell low">Materials</div>
                <div className="heatmap-cell medium">Regulations</div>
                <div className="heatmap-cell low">Market</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VoiceCommandModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowVoiceCommand(false)}>
      <div className="modal-content voice-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🎤 Voice Command Center</h2>
          <button onClick={() => setShowVoiceCommand(false)}>✕</button>
        </div>
        
        <div className="voice-content">
          <div className="voice-interface">
            <div className={`voice-circle ${isListening ? 'listening' : ''}`}>
              <div className="voice-wave"></div>
              <div className="voice-icon">🎤</div>
            </div>
            <p className="voice-status">
              {isListening ? 'Listening...' : 'Click to start voice command'}
            </p>
            <button 
              className="voice-btn"
              onClick={() => setIsListening(!isListening)}
            >
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
          </div>
          
          <div className="voice-commands">
            <h3>Sample Voice Commands:</h3>
            <div className="command-list">
              <div className="command-item">"Show me all delayed permits"</div>
              <div className="command-item">"What's the status of Austin project?"</div>
              <div className="command-item">"Assign task to Emma"</div>
              <div className="command-item">"Generate progress report"</div>
              <div className="command-item">"Check weather for construction"</div>
            </div>
          </div>
          
          {voiceCommand && (
            <div className="voice-result">
              <h4>Command Result:</h4>
              <p>{voiceCommand}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SmartSearchModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowSmartSearch(false)}>
      <div className="modal-content search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔍 Smart Search</h2>
          <button onClick={() => setShowSmartSearch(false)}>✕</button>
        </div>
        
        <div className="search-content">
          <div className="search-interface">
            <input 
              type="text" 
              placeholder="Ask anything about your projects..."
              className="smart-search-input"
            />
            <button className="search-btn">Search</button>
          </div>
          
          <div className="search-suggestions">
            <h3>Quick Searches:</h3>
            <div className="suggestion-grid">
              <button className="suggestion-btn">Properties in Austin</button>
              <button className="suggestion-btn">Delayed tasks this week</button>
              <button className="suggestion-btn">Agent performance metrics</button>
              <button className="suggestion-btn">Permit status updates</button>
              <button className="suggestion-btn">Budget vs actual costs</button>
              <button className="suggestion-btn">Similar investment opportunities</button>
            </div>
          </div>
          
          <div className="search-results">
            <h3>Recent Searches:</h3>
            <div className="result-item">
              <span className="result-icon">🏠</span>
              <span className="result-text">Properties with ROI > 15%</span>
              <span className="result-count">12 results</span>
            </div>
            <div className="result-item">
              <span className="result-icon">📋</span>
              <span className="result-text">Pending permits in Texas</span>
              <span className="result-count">5 results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const WorkflowEngineModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowWorkflowEngine(false)}>
      <div className="modal-content workflow-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔄 Dynamic Workflow Engine</h2>
          <button onClick={() => setShowWorkflowEngine(false)}>✕</button>
        </div>
        
        <div className="workflow-content">
          <div className="workflow-stats">
            <div className="stat-card">
              <div className="stat-value">47</div>
              <div className="stat-label">Active Workflows</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">23%</div>
              <div className="stat-label">Time Reduction</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">$18K</div>
              <div className="stat-label">Cost Savings</div>
            </div>
          </div>

          <div className="workflow-examples">
            <h3>📋 Active Workflow Examples</h3>
            
            <div className="workflow-item">
              <div className="workflow-header">
                <span className="workflow-icon">🏠</span>
                <span className="workflow-title">Property Acquisition Workflow</span>
                <span className="workflow-status active">Running</span>
              </div>
              <div className="workflow-steps">
                <div className="step completed">✅ Market Analysis (Emma)</div>
                <div className="step active">🔄 Loan Pre-approval (Alex)</div>
                <div className="step pending">⏳ Due Diligence (Jennifer)</div>
                <div className="step pending">⏳ Purchase Agreement (Emma)</div>
              </div>
              <div className="workflow-ai-optimization">
                🧠 AI suggests: Parallel processing loan approval + due diligence = 3 days saved
              </div>
            </div>

            <div className="workflow-item">
              <div className="workflow-header">
                <span className="workflow-icon">🏗️</span>
                <span className="workflow-title">Construction Management</span>
                <span className="workflow-status optimized">AI Optimized</span>
              </div>
              <div className="workflow-steps">
                <div className="step completed">✅ Permit Application (Jennifer)</div>
                <div className="step completed">✅ Design Plans (Sarah)</div>
                <div className="step active">🔄 Material Orders (David)</div>
                <div className="step pending">⏳ Construction Start (Mike)</div>
              </div>
              <div className="workflow-ai-optimization">
                ⚡ Auto-optimized: Material orders moved 2 weeks early, saving $12K
              </div>
            </div>

            <div className="workflow-item">
              <div className="workflow-header">
                <span className="workflow-icon">📊</span>
                <span className="workflow-title">Compliance & Reporting</span>
                <span className="workflow-status automated">Automated</span>
              </div>
              <div className="workflow-steps">
                <div className="step active">🔄 Building Code Check (Jennifer)</div>
                <div className="step active">🔄 Safety Inspection (Carlos)</div>
                <div className="step pending">⏳ Final Report (All Agents)</div>
              </div>
              <div className="workflow-ai-optimization">
                🤖 Fully automated: All compliance checks run automatically every 24 hours
              </div>
            </div>
          </div>

          <div className="workflow-triggers">
            <h3>⚡ Smart Triggers & Automation</h3>
            <div className="trigger-examples">
              <div className="trigger-item">
                <span className="trigger-icon">📅</span>
                <span className="trigger-desc">When permit approved → Auto-start material orders</span>
                <span className="trigger-result">Saves 5 days</span>
              </div>
              <div className="trigger-item">
                <span className="trigger-icon">🌧️</span>
                <span className="trigger-desc">Weather delay detected → Reschedule automatically</span>
                <span className="trigger-result">Prevents $8K loss</span>
              </div>
              <div className="trigger-item">
                <span className="trigger-icon">💰</span>
                <span className="trigger-desc">Budget variance >10% → Alert + rebalance</span>
                <span className="trigger-result">Early warning</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const DeployModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowDeployModal(false)}>
      <div className="modal-content deploy-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🚀 Deploy Agent Code</h2>
          <button onClick={() => setShowDeployModal(false)}>✕</button>
        </div>
        
        <div className="deploy-content">
          <div className="deploy-overview">
            <h3>📦 Deployment Summary</h3>
            <div className="deploy-details">
              <div className="detail-item">
                <span className="detail-label">Agent:</span>
                <span className="detail-value">{agents.find(a => a.id === activeCodeAgent)?.name} ({agents.find(a => a.id === activeCodeAgent)?.role})</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Files Changed:</span>
                <span className="detail-value">3 files (main.py, config.py, ai_enhancements.py)</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Tests Status:</span>
                <span className="detail-value success">✅ All 6 tests passing</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Performance Impact:</span>
                <span className="detail-value improvement">📈 +62% faster execution</span>
              </div>
            </div>
          </div>

          <div className="deployment-targets">
            <h3>🎯 Deployment Targets</h3>
            <div className="target-list">
              <div className="target-item">
                <input type="checkbox" defaultChecked />
                <span className="target-icon">🧪</span>
                <span className="target-name">Development Environment</span>
                <span className="target-status ready">Ready</span>
              </div>
              <div className="target-item">
                <input type="checkbox" defaultChecked />
                <span className="target-icon">🔄</span>
                <span className="target-name">Staging Environment</span>
                <span className="target-status ready">Ready</span>
              </div>
              <div className="target-item">
                <input type="checkbox" />
                <span className="target-icon">🚀</span>
                <span className="target-name">Production Environment</span>
                <span className="target-status warning">Requires approval</span>
              </div>
            </div>
          </div>

          <div className="deployment-timeline">
            <h3>⏱️ Deployment Timeline</h3>
            <div className="timeline-steps">
              <div className="timeline-step">
                <div className="step-time">00:30</div>
                <div className="step-desc">Code compilation & validation</div>
              </div>
              <div className="timeline-step">
                <div className="step-time">01:00</div>
                <div className="step-desc">Deploy to staging environment</div>
              </div>
              <div className="timeline-step">
                <div className="step-time">01:30</div>
                <div className="step-desc">Run integration tests</div>
              </div>
              <div className="timeline-step">
                <div className="step-time">02:00</div>
                <div className="step-desc">Production deployment (if approved)</div>
              </div>
            </div>
          </div>

          <div className="deployment-actions">
            <button className="deploy-btn staging">🔄 Deploy to Staging</button>
            <button className="deploy-btn production">🚀 Deploy to Production</button>
            <button className="deploy-btn rollback">↩️ Rollback Previous</button>
          </div>

          <div className="deployment-log">
            <h3>📝 Recent Deployments</h3>
            <div className="log-entries">
              <div className="log-entry success">
                <span className="log-time">10:23 AM</span>
                <span className="log-message">✅ Alex Agent v2.1 deployed successfully</span>
              </div>
              <div className="log-entry success">
                <span className="log-time">09:45 AM</span>
                <span className="log-message">✅ Emma Agent v1.8 performance optimizations deployed</span>
              </div>
              <div className="log-entry warning">
                <span className="log-time">09:12 AM</span>
                <span className="log-message">⚠️ Sarah Agent v2.0 deployment pending approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const CodeOptimizeModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowCodeOptimizeModal(false)}>
      <div className="modal-content optimize-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🧠 AI Code Optimizer</h2>
          <button onClick={() => setShowCodeOptimizeModal(false)}>✕</button>
        </div>
        
        <div className="optimize-content">
          <div className="optimization-analysis">
            <h3>🔍 Code Analysis Results</h3>
            <div className="analysis-summary">
              <div className="analysis-metric">
                <span className="metric-label">Performance Issues</span>
                <span className="metric-value warning">3 found</span>
              </div>
              <div className="analysis-metric">
                <span className="metric-label">Security Vulnerabilities</span>
                <span className="metric-value danger">1 found</span>
              </div>
              <div className="analysis-metric">
                <span className="metric-label">Optimization Opportunities</span>
                <span className="metric-value success">8 found</span>
              </div>
            </div>
          </div>

          <div className="optimization-suggestions">
            <h3>💡 AI Optimization Suggestions</h3>
            <div className="suggestion-list">
              <div className="suggestion-item high-impact">
                <div className="suggestion-header">
                  <span className="suggestion-icon">⚡</span>
                  <span className="suggestion-title">Implement Async Processing</span>
                  <span className="impact-badge high">High Impact</span>
                </div>
                <div className="suggestion-description">
                  Convert sequential API calls to parallel execution using asyncio
                </div>
                <div className="suggestion-metrics">
                  <span className="metric">Performance: +62% faster</span>
                  <span className="metric">Confidence: 94%</span>
                </div>
                <div className="suggestion-code">
                  <div className="code-before">
                    <span className="code-label">Before:</span>
                    <code>result1 = api_call_1(); result2 = api_call_2()</code>
                  </div>
                  <div className="code-after">
                    <span className="code-label">After:</span>
                    <code>results = await asyncio.gather(api_call_1(), api_call_2())</code>
                  </div>
                </div>
                <button className="apply-optimization-btn">✅ Apply Optimization</button>
              </div>

              <div className="suggestion-item medium-impact">
                <div className="suggestion-header">
                  <span className="suggestion-icon">💾</span>
                  <span className="suggestion-title">Add Smart Caching</span>
                  <span className="impact-badge medium">Medium Impact</span>
                </div>
                <div className="suggestion-description">
                  Cache frequently accessed property data to reduce API calls
                </div>
                <div className="suggestion-metrics">
                  <span className="metric">API calls: -45%</span>
                  <span className="metric">Confidence: 87%</span>
                </div>
                <button className="apply-optimization-btn">✅ Apply Optimization</button>
              </div>

              <div className="suggestion-item security">
                <div className="suggestion-header">
                  <span className="suggestion-icon">🔒</span>
                  <span className="suggestion-title">Fix Security Vulnerability</span>
                  <span className="impact-badge critical">Critical</span>
                </div>
                <div className="suggestion-description">
                  API key exposed in main.py line 23 - move to environment variables
                </div>
                <div className="suggestion-metrics">
                  <span className="metric">Security Risk: High</span>
                  <span className="metric">Fix Time: 2 minutes</span>
                </div>
                <button className="apply-optimization-btn critical">🚨 Fix Now</button>
              </div>

              <div className="suggestion-item low-impact">
                <div className="suggestion-header">
                  <span className="suggestion-icon">🧹</span>
                  <span className="suggestion-title">Code Cleanup</span>
                  <span className="impact-badge low">Low Impact</span>
                </div>
                <div className="suggestion-description">
                  Remove unused imports and optimize variable names
                </div>
                <div className="suggestion-metrics">
                  <span className="metric">Code quality: +15%</span>
                  <span className="metric">Bundle size: -8%</span>
                </div>
                <button className="apply-optimization-btn">✅ Apply Cleanup</button>
              </div>
            </div>
          </div>

          <div className="optimization-results">
            <h3>📊 Optimization Impact Preview</h3>
            <div className="results-comparison">
              <div className="comparison-item">
                <span className="comparison-label">Execution Time</span>
                <div className="comparison-bars">
                  <div className="bar-before">
                    <span className="bar-label">Before</span>
                    <div className="bar" style={{ width: '100%', background: '#ef4444' }}>6.2s</div>
                  </div>
                  <div className="bar-after">
                    <span className="bar-label">After</span>
                    <div className="bar" style={{ width: '37%', background: '#22c55e' }}>2.3s</div>
                  </div>
                </div>
                <span className="improvement">62% faster</span>
              </div>
              
              <div className="comparison-item">
                <span className="comparison-label">Memory Usage</span>
                <div className="comparison-bars">
                  <div className="bar-before">
                    <span className="bar-label">Before</span>
                    <div className="bar" style={{ width: '100%', background: '#ef4444' }}>87MB</div>
                  </div>
                  <div className="bar-after">
                    <span className="bar-label">After</span>
                    <div className="bar" style={{ width: '52%', background: '#22c55e' }}>45MB</div>
                  </div>
                </div>
                <span className="improvement">48% reduction</span>
              </div>
            </div>
          </div>

          <div className="optimization-controls">
            <button className="optimize-all-btn">🚀 Apply All Optimizations</button>
            <button className="preview-btn">👁️ Preview Changes</button>
            <button className="cancel-btn">❌ Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );

  const IoTDashboardModal: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowIoTDashboard(false)}>
      <div className="modal-content iot-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📡 IoT & Sensor Dashboard</h2>
          <button onClick={() => setShowIoTDashboard(false)}>✕</button>
        </div>
        
        <div className="iot-content">
          <div className="iot-grid">
            <div className="iot-card">
              <h3>🌡️ Environmental Sensors</h3>
              <div className="sensor-reading">
                <span className="reading-value">72°F</span>
                <span className="reading-label">Temperature</span>
              </div>
              <div className="sensor-reading">
                <span className="reading-value">45%</span>
                <span className="reading-label">Humidity</span>
              </div>
              <div className="sensor-status active">All sensors active</div>
            </div>
            
            <div className="iot-card">
              <h3>🏗️ Construction Progress</h3>
              <div className="progress-sensors">
                <div className="progress-item">
                  <span>Foundation</span>
                  <div className="progress-bar">
                    <div style={{ width: '100%' }}></div>
                  </div>
                  <span>Complete</span>
                </div>
                <div className="progress-item">
                  <span>Framing</span>
                  <div className="progress-bar">
                    <div style={{ width: '65%' }}></div>
                  </div>
                  <span>65%</span>
                </div>
              </div>
            </div>
            
            <div className="iot-card">
              <h3>🔒 Security Cameras</h3>
              <div className="camera-grid">
                <div className="camera-feed">
                  <div className="camera-placeholder">📷</div>
                  <span>Front Gate</span>
                </div>
                <div className="camera-feed">
                  <div className="camera-placeholder">📷</div>
                  <span>Work Zone</span>
                </div>
              </div>
              <div className="security-status">All cameras operational</div>
            </div>
            
            <div className="iot-card">
              <h3>📍 Equipment Tracking</h3>
              <div className="equipment-list">
                <div className="equipment-item">
                  <span className="equipment-icon">🚛</span>
                  <span>Excavator #1</span>
                  <span className="location">On-site</span>
                </div>
                <div className="equipment-item">
                  <span className="equipment-icon">🏗️</span>
                  <span>Crane #2</span>
                  <span className="location">Storage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Floating Action Buttons
  const FloatingActionButtons: React.FC = () => (
    <div className="floating-actions">
      <button 
        className="fab main-fab"
        onClick={() => setShowAIHub(true)}
        title="AI Hub"
      >
        🧠
      </button>
      <button 
        className="fab"
        onClick={() => setShowVoiceCommand(true)}
        title="Voice Commands"
      >
        🎤
      </button>
      <button 
        className="fab"
        onClick={() => setShowSmartSearch(true)}
        title="Smart Search"
      >
        🔍
      </button>
      <button 
        className="fab"
        onClick={() => setShowPredictiveAnalytics(true)}
        title="Predictive Analytics"
      >
        📊
      </button>
    </div>
  );

  const AgentModal: React.FC = () => {
    if (!selectedAgent) return null;
    
    return (
      <div className="modal-overlay" onClick={() => setShowAgentModal(false)}>
        <div className={`modal-content agent-detail-modal ${isMobile ? 'mobile' : ''}`} onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <div className="agent-modal-header">
              <div className={`agent-avatar-large ${selectedAgent.type}`}>{selectedAgent.avatar}</div>
              <div className="agent-modal-info">
                <h2>{selectedAgent.name}</h2>
                <p className="agent-modal-role">{selectedAgent.role}</p>
                <div className={`agent-modal-status ${selectedAgent.status}`}>
                  <div className="status-dot"></div>
                  <span>{selectedAgent.status.toUpperCase()}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setShowAgentModal(false)}>✕</button>
          </div>
          
          <div className="modal-tabs">
            <div className="tab active">Overview</div>
            <div className="tab">Performance</div>
            <div className="tab">Settings</div>
          </div>
          
          <div className="modal-body">
            <div className="agent-modal-content">
              <div className="detail-section">
                <h3>📊 Current Status</h3>
                <div className="status-details-mobile">
                  <div className="status-overview">
                    <div className={`status-badge-large ${selectedAgent.status}`}>
                      {selectedAgent.status.toUpperCase()}
                    </div>
                    <div className="workload-section">
                      <div className="workload-header">
                        <span>Workload: {selectedAgent.workload}%</span>
                        <span className="workload-efficiency">Efficiency: {selectedAgent.efficiency}%</span>
                      </div>
                      <div className="workload-bar-container">
                        <div className="workload-bar-large">
                          <div style={{ 
                            width: `${selectedAgent.workload}%`,
                            background: getWorkloadColor(selectedAgent.workload)
                          }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>🎯 Current Task</h3>
                <div className="current-task-mobile">
                  {selectedAgent.task}
                </div>
              </div>
              
              <div className="detail-section">
                <h3>📈 Key Metrics</h3>
                <div className="metrics-grid-mobile">
                  {selectedAgent.metrics.map((metric, index) => (
                    <div key={index} className="metric-card-mobile">
                      <div className="metric-value-large">{metric.value}</div>
                      <div className="metric-label-mobile">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="detail-section">
                <h3>⚡ Performance Metrics</h3>
                <div className="performance-grid-mobile">
                  <div className="perf-item-mobile">
                    <div className="perf-label">Completion Rate</div>
                    <div className="perf-value">{selectedAgent.completionRate}%</div>
                    <div className="perf-bar">
                      <div style={{ width: `${selectedAgent.completionRate}%` }}></div>
                    </div>
                  </div>
                  <div className="perf-item-mobile">
                    <div className="perf-label">Response Time</div>
                    <div className="perf-value">{selectedAgent.responseTime}s</div>
                    <div className="perf-indicator good">Fast</div>
                  </div>
                  <div className="perf-item-mobile">
                    <div className="perf-label">Learning Progress</div>
                    <div className="perf-value">{selectedAgent.learningProgress}%</div>
                    <div className="perf-bar">
                      <div style={{ width: `${selectedAgent.learningProgress}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="detail-section">
                <h3>🕒 Recent Activity</h3>
                <div className="activity-list-mobile">
                  <div className="activity-item-mobile">
                    <div className="activity-time">2 mins ago</div>
                    <div className="activity-desc">Completed loan pre-approval analysis</div>
                    <div className="activity-status success">✅</div>
                  </div>
                  <div className="activity-item-mobile">
                    <div className="activity-time">15 mins ago</div>
                    <div className="activity-desc">Updated market rate calculations</div>
                    <div className="activity-status success">✅</div>
                  </div>
                  <div className="activity-item-mobile">
                    <div className="activity-time">1 hour ago</div>
                    <div className="activity-desc">Generated compliance report</div>
                    <div className="activity-status success">✅</div>
                  </div>
                </div>
              </div>

              {/* AI Insights for this agent */}
              <div className="detail-section">
                <h3>🧠 AI Insights</h3>
                <div className="agent-ai-insights">
                  <div className="ai-insight-mobile">
                    <span className="insight-icon">⚡</span>
                    <span className="insight-text">Performance optimized by 23% this week</span>
                  </div>
                  <div className="ai-insight-mobile">
                    <span className="insight-icon">🎯</span>
                    <span className="insight-text">Best suited for complex analysis tasks</span>
                  </div>
                  <div className="ai-insight-mobile">
                    <span className="insight-icon">📈</span>
                    <span className="insight-text">Efficiency trending upward (+15%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="modal-footer">
            <button className="btn-secondary mobile-btn">⏸️ Pause</button>
            <button className="btn-primary mobile-btn">📋 Assign Task</button>
            <button className="btn-secondary mobile-btn">💬 Chat</button>
          </div>
        </div>
      </div>
    );
  };

  const CodeView: React.FC = () => (
    <div className={`code-view active ${isCodeFullscreen ? 'fullscreen' : ''}`}>
      <div className="code-toolbar">
        <div className="code-agent-tabs">
          {agents.map(agent => (
            <button
              key={agent.id}
              className={`code-agent-tab ${activeCodeAgent === agent.id ? 'active' : ''}`}
              onClick={() => setActiveCodeAgent(agent.id)}
            >
              <div className={`code-agent-tab-avatar ${agent.type}`}>{agent.avatar}</div>
              <span>{agent.name}</span>
              <div className={`agent-status-dot ${agent.status}`}></div>
            </button>
          ))}
        </div>
        
        <div className="code-controls">
          <button 
            className="control-button"
            onClick={() => setShowTemplateLibrary(true)}
          >
            📚 Templates
          </button>
          <button 
            className={`control-button ${testMode ? 'active' : ''}`}
            onClick={() => setTestMode(!testMode)}
            style={{ display: 'none' }}
          >
            🧪 Test Mode
          </button>
          <button 
            className="control-button"
            onClick={() => setShowDeployModal(true)}
          >
            🔄 Deploy
          </button>
          <button 
            className="control-button ai-optimize"
            onClick={() => setShowCodeOptimizeModal(true)}
          >
            🤖 AI Optimize
          </button>
          <button 
            className="control-button fullscreen-btn"
            onClick={() => setIsCodeFullscreen(!isCodeFullscreen)}
            title={isCodeFullscreen ? 'Exit Fullscreen (ESC)' : 'Enter Fullscreen'}
            style={{ display: isMobile ? 'none' : 'block' }}
          >
            {isCodeFullscreen ? '🗗' : '⛶'}
          </button>
        </div>
      </div>
      
      <div className="code-content-container">
        <div className="code-sidebar">
          <div className="code-section-header">
            <h4>Agent Files</h4>
            <button className="add-file-btn">+</button>
          </div>
          <div className="file-tree">
            <div className={`file-item ${currentCodeTab === 'main.py' ? 'active' : ''}`} 
                 onClick={() => setCurrentCodeTab('main.py')}>
              📄 main.py
            </div>
            <div className={`file-item ${currentCodeTab === 'config.py' ? 'active' : ''}`}
                 onClick={() => setCurrentCodeTab('config.py')}>
              ⚙️ config.py
            </div>
            <div className={`file-item ${currentCodeTab === 'utils.py' ? 'active' : ''}`}
                 onClick={() => setCurrentCodeTab('utils.py')}>
              🔧 utils.py
            </div>
            <div className={`file-item ${currentCodeTab === 'tests.py' ? 'active' : ''}`}
                 onClick={() => setCurrentCodeTab('tests.py')}>
              🧪 tests.py
            </div>
            <div className={`file-item ${currentCodeTab === 'ai_enhancements.py' ? 'active' : ''}`}
                 onClick={() => setCurrentCodeTab('ai_enhancements.py')}>
              🧠 ai_enhancements.py
            </div>
          </div>
          
          <div className="version-control">
            <h4>Version Control</h4>
            <div className="git-status">
              <div className="git-item">
                <span className="git-icon">🔸</span>
                <span>Modified: main.py</span>
              </div>
              <div className="git-item">
                <span className="git-icon">🔹</span>
                <span>Added: ai_enhancements.py</span>
              </div>
              <div className="git-item">
                <span className="git-icon">🔸</span>
                <span>Modified: config.py</span>
              </div>
            </div>
            <button className="commit-btn">Commit Changes</button>
          </div>

          <div className="ai-code-insights">
            <h4>🧠 AI Code Insights</h4>
            <div className="code-insight-item">
              <span className="insight-icon">💡</span>
              <span>Optimize response time by 23%</span>
            </div>
            <div className="code-insight-item">
              <span className="insight-icon">🔒</span>
              <span>Security vulnerability detected</span>
            </div>
            <div className="code-insight-item">
              <span className="insight-icon">⚡</span>
              <span>Suggest async processing</span>
            </div>
          </div>
        </div>
        
        <div className="code-editor-area">
          <div className="editor-tabs">
            <div className="editor-tabs-left">
              <div className="editor-tab active">
                {currentCodeTab}
                <button className="close-tab">×</button>
              </div>
              {testMode && (
                <div className="editor-tab">
                  🧪 Test Results
                </div>
              )}
            </div>
            {isMobile && (
              <button 
                className="mobile-fullscreen-btn"
                onClick={() => setIsCodeFullscreen(!isCodeFullscreen)}
                title={isCodeFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
              >
                {isCodeFullscreen ? '🗗' : '⛶'}
              </button>
            )}
          </div>
          
          <div className="code-editor-container">
            <div className="code-editor">
              <div className="line-numbers">
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i + 1} className="line-number">{i + 1}</div>
                ))}
              </div>
              <div className="code-content">
                <div className="code-line">
                  <span className="keyword">import</span> <span className="module">requests</span>
                </div>
                <div className="code-line">
                  <span className="keyword">from</span> <span className="module">datetime</span> <span className="keyword">import</span> <span className="module">datetime</span>
                </div>
                <div className="code-line">
                  <span className="keyword">from</span> <span className="module">typing</span> <span className="keyword">import</span> <span className="type">Dict, List, Optional</span>
                </div>
                <div className="code-line">
                  <span className="keyword">from</span> <span className="module">ai_orchestrator</span> <span className="keyword">import</span> <span className="type">SmartRouter, LearningEngine</span>
                </div>
                <div className="code-line"></div>
                <div className="code-line">
                  <span className="keyword">class</span> <span className="class">{agents.find(a => a.id === activeCodeAgent)?.name}Agent</span>:
                </div>
                <div className="code-line">
                  <span className="indent">    </span><span className="string">"""</span>
                </div>
                <div className="code-line">
                  <span className="indent">    </span><span className="string">{agents.find(a => a.id === activeCodeAgent)?.role} AI Agent v2.0</span>
                </div>
                <div className="code-line">
                  <span className="indent">    </span><span className="string">Enhanced with AI Orchestrator and Learning Capabilities</span>
                </div>
                <div className="code-line">
                  <span className="indent">    </span><span className="string">Specialized in {agents.find(a => a.id === activeCodeAgent)?.type} operations</span>
                </div>
                <div className="code-line">
                  <span className="indent">    </span><span className="string">"""</span>
                </div>
                <div className="code-line"></div>
                <div className="code-line">
                  <span className="indent">    </span><span className="keyword">def</span> <span className="function">__init__</span>(<span className="variable">self</span>, <span className="variable">orchestrator</span>=<span className="value">None</span>):
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="variable">self</span>.<span className="property">status</span> = <span className="string">"{agents.find(a => a.id === activeCodeAgent)?.status}"</span>
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="variable">self</span>.<span className="property">priority</span> = <span className="string">"{agents.find(a => a.id === activeCodeAgent)?.priority}"</span>
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="variable">self</span>.<span className="property">workload</span> = <span className="number">{agents.find(a => a.id === activeCodeAgent)?.workload}</span>
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="variable">self</span>.<span className="property">efficiency</span> = <span className="number">{agents.find(a => a.id === activeCodeAgent)?.efficiency}</span>
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="variable">self</span>.<span className="property">learning_progress</span> = <span className="number">{agents.find(a => a.id === activeCodeAgent)?.learningProgress}</span>
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="variable">self</span>.<span className="property">api_client</span> = <span className="function">APIClient</span>()
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="variable">self</span>.<span className="property">orchestrator</span> = <span className="variable">orchestrator</span> <span className="keyword">or</span> <span className="function">SmartRouter</span>()
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="variable">self</span>.<span className="property">learning_engine</span> = <span className="function">LearningEngine</span>()
                </div>
                <div className="code-line"></div>
                <div className="code-line">
                  <span className="indent">    </span><span className="keyword">async</span> <span className="keyword">def</span> <span className="function">process_task</span>(<span className="variable">self</span>, <span className="variable">task</span>: <span className="type">Dict</span>):
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="string">"""Enhanced task processing with AI orchestration"""</span>
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="keyword">try</span>:
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="comment"># AI-powered task optimization</span>
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="variable">optimized_task</span> = <span className="keyword">await</span> <span className="variable">self</span>.<span className="property">orchestrator</span>.<span className="function">optimize</span>(<span className="variable">task</span>)
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="variable">result</span> = <span className="keyword">await</span> <span className="variable">self</span>.<span className="function">analyze</span>(<span className="variable">optimized_task</span>)
                </div>
                <div className="code-line">
                  <span className="indent">            </span>
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="comment"># Update learning model</span>
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="keyword">await</span> <span className="variable">self</span>.<span className="property">learning_engine</span>.<span className="function">update</span>(<span className="variable">task</span>, <span className="variable">result</span>)
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="keyword">return</span> <span className="variable">result</span>
                </div>
                <div className="code-line">
                  <span className="indent">        </span><span className="keyword">except</span> <span className="type">Exception</span> <span className="keyword">as</span> <span className="variable">e</span>:
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="function">logger</span>.<span className="function">error</span>(<span className="string">f"Task processing failed: {'{e}'}"</span>)
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="keyword">await</span> <span className="variable">self</span>.<span className="function">handle_error</span>(<span className="variable">e</span>, <span className="variable">task</span>)
                </div>
                <div className="code-line">
                  <span className="indent">            </span><span className="keyword">raise</span>
                </div>
              </div>
            </div>
            
            {testMode && (
              <div className="test-panel">
                <div className="test-header">
                  <h4>🧪 Test Environment</h4>
                  <button className="run-test-btn">▶ Run Tests</button>
                </div>
                <div className="test-results">
                  <div className="test-item success">✅ test_agent_initialization - PASSED</div>
                  <div className="test-item success">✅ test_task_processing - PASSED</div>
                  <div className="test-item success">✅ test_ai_orchestration - PASSED</div>
                  <div className="test-item warning">⚠️ test_error_handling - WARNING</div>
                  <div className="test-item success">✅ test_learning_engine - PASSED</div>
                  <div className="test-item success">✅ test_api_integration - PASSED</div>
                  <div className="test-performance">
                    <h5>Performance Metrics:</h5>
                    <div className="perf-metric">Response Time: 2.3s</div>
                    <div className="perf-metric">Memory Usage: 45MB</div>
                    <div className="perf-metric">CPU Usage: 12%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="code-right-panel">
          <div className="panel-section">
            <h4>🔍 Debugging</h4>
            <div className="debug-controls">
              <button className="debug-btn">Set Breakpoint</button>
              <button className="debug-btn">Step Through</button>
              <button className="debug-btn">Watch Variables</button>
              <button className="debug-btn">AI Debug Assistant</button>
            </div>
          </div>
          
          <div className="panel-section">
            <h4>📊 Performance</h4>
            <div className="perf-metrics">
              <div className="perf-metric">
                <span>Execution Time</span>
                <strong>2.3s</strong>
              </div>
              <div className="perf-metric">
                <span>Memory Usage</span>
                <strong>45MB</strong>
              </div>
              <div className="perf-metric">
                <span>API Calls</span>
                <strong>12</strong>
              </div>
              <div className="perf-metric">
                <span>Learning Score</span>
                <strong>{agents.find(a => a.id === activeCodeAgent)?.learningProgress}%</strong>
              </div>
            </div>
          </div>
          
          <div className="panel-section">
            <h4>🔌 Integrations</h4>
            <div className="integration-list">
              <div className="integration-item">
                <span>🏦 Banking API</span>
                <div className="status-dot active"></div>
              </div>
              <div className="integration-item">
                <span>🏠 MLS Database</span>
                <div className="status-dot active"></div>
              </div>
              <div className="integration-item">
                <span>📋 Permit System</span>
                <div className="status-dot idle"></div>
              </div>
              <div className="integration-item">
                <span>🧠 AI Orchestrator</span>
                <div className="status-dot active"></div>
              </div>
            </div>
          </div>

          <div className="panel-section">
            <h4>🎯 AI Optimization</h4>
            <div className="optimization-suggestions">
              <div className="opt-suggestion">
                <span className="opt-icon">⚡</span>
                <span>Cache API responses</span>
                <button className="apply-btn">Apply</button>
              </div>
              <div className="opt-suggestion">
                <span className="opt-icon">🔄</span>
                <span>Async task batching</span>
                <button className="apply-btn">Apply</button>
              </div>
              <div className="opt-suggestion">
                <span className="opt-icon">🧠</span>
                <span>ML model update</span>
                <button className="apply-btn">Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const TimelineView: React.FC = () => (
    <div className="timeline-view">
      <div className="timeline-toolbar">
        <div className="timeline-controls">
          <button 
            className={`timeline-btn ${timelineView === 'gantt' ? 'active' : ''}`}
            onClick={() => setTimelineView('gantt')}
          >
            📊 Gantt Chart
          </button>
          <button 
            className={`timeline-btn ${timelineView === 'milestones' ? 'active' : ''}`}
            onClick={() => setTimelineView('milestones')}
          >
            🎯 Milestones
          </button>
          <button 
            className={`timeline-btn ${timelineView === 'risks' ? 'active' : ''}`}
            onClick={() => setTimelineView('risks')}
          >
            ⚠️ Risk Analysis
          </button>
        </div>
        
        <div className="timeline-filters">
          <select className="timeline-select">
            <option>All Phases</option>
            <option>Critical Path Only</option>
            <option>Delayed Tasks</option>
            <option>AI Optimized</option>
          </select>
          <button 
            className="timeline-btn"
            onClick={() => setShowTimelineAIOptimize(true)}
          >
            🧠 AI Optimize
          </button>
          <button 
            className="export-btn"
            onClick={() => setShowExportModal(true)}
          >
            📤 Export
          </button>
        </div>
      </div>
      
      {timelineView === 'gantt' && (
        <div className="gantt-container">
          <div className="gantt-header">
            <div className="task-column">Tasks</div>
            <div className="timeline-months">
              <div className="month">Jun 2025</div>
              <div className="month">Jul 2025</div>
              <div className="month">Aug 2025</div>
              <div className="month">Sep 2025</div>
              <div className="month">Oct 2025</div>
              <div className="month">Nov 2025</div>
            </div>
          </div>
          
          <div className="gantt-body">
            {timelineTasks.map(task => (
              <div key={task.id} className="gantt-row">
                <div className="task-info">
                  <div className="task-name">
                    {task.critical && <span className="critical-indicator">🔥</span>}
                    {task.name}
                  </div>
                  <div className="task-assignee">
                    Assigned to: {task.assignedAgent}
                  </div>
                  <div className="task-ai-insights">
                    🧠 AI suggests 2-day optimization
                  </div>
                </div>
                <div className="timeline-track">
                  <div 
                    className={`task-bar ${task.type} ${task.critical ? 'critical' : ''}`}
                    style={{
                      left: '10%',
                      width: `${task.progress}%`,
                      opacity: task.progress > 0 ? 1 : 0.3
                    }}
                  >
                    <span className="task-progress">{task.progress}%</span>
                  </div>
                  {task.dependencies.length > 0 && (
                    <div className="dependency-line"></div>
                  )}
                  <div className="task-ai-marker">🎯</div>
                </div>
              </div>
            ))}
          </div>

          <div className="gantt-insights">
            <div className="insight-panel">
              <h4>🧠 AI Timeline Insights</h4>
              <div className="timeline-insight">
                <span className="insight-icon">⚡</span>
                <span>Critical path can be shortened by 3 days</span>
              </div>
              <div className="timeline-insight">
                <span className="insight-icon">🌧️</span>
                <span>Weather delays expected July 15-20</span>
              </div>
              <div className="timeline-insight">
                <span className="insight-icon">💰</span>
                <span>Resource optimization saves $12K</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {timelineView === 'milestones' && (
        <div className="milestones-container">
          <div className="milestone-timeline">
            {phases.map((phase, index) => (
              <div key={phase.id} className={`milestone ${phase.status}`}>
                <div className="milestone-marker">
                  <div className="milestone-number">{index + 1}</div>
                </div>
                <div className="milestone-content">
                  <h4>{phase.title}</h4>
                  <p>{phase.subtitle}</p>
                  <div className="milestone-dates">
                    {phase.startDate} - {phase.endDate}
                  </div>
                  {phase.assignedAgent && (
                    <div className="milestone-agent">
                      Assigned to: {phase.assignedAgent}
                    </div>
                  )}
                  <div className="milestone-ai-suggestion">
                    🧠 AI suggests parallel processing opportunity
                  </div>
                </div>
                {index < phases.length - 1 && (
                  <div className="milestone-connector"></div>
                )}
              </div>
            ))}
          </div>

          <div className="milestone-ai-panel">
            <h3>🎯 Milestone Optimization</h3>
            <div className="milestone-metrics">
              <div className="metric-card">
                <div className="metric-value">23%</div>
                <div className="metric-label">Time Reduction</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">$18K</div>
                <div className="metric-label">Cost Savings</div>
              </div>
              <div className="metric-card">
                <div className="metric-value">94%</div>
                <div className="metric-label">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {timelineView === 'risks' && (
        <div className="risks-container">
          <div className="risk-dashboard">
            <div className="risk-summary">
              <div className="risk-card high-risk">
                <h3>High Risk</h3>
                <div className="risk-count">2</div>
                <p>Weather delays, Permit approval</p>
              </div>
              <div className="risk-card medium-risk">
                <h3>Medium Risk</h3>
                <div className="risk-count">4</div>
                <p>Material costs, Labor shortage</p>
              </div>
              <div className="risk-card low-risk">
                <h3>Low Risk</h3>
                <div className="risk-count">1</div>
                <p>Minor design changes</p>
              </div>
            </div>
            
            <div className="risk-timeline">
              <h4>Risk Timeline & AI Mitigation</h4>
              <div className="risk-items">
                <div className="risk-item">
                  <div className="risk-icon high">⚠️</div>
                  <div className="risk-details">
                    <h5>Weather Impact on Foundation</h5>
                    <p>Heavy rain season starts July 15th</p>
                    <div className="mitigation">
                      AI Mitigation: Schedule foundation work before July 10th
                    </div>
                    <div className="ai-confidence">🧠 95% confidence</div>
                  </div>
                  <div className="risk-probability">85%</div>
                </div>
                
                <div className="risk-item">
                  <div className="risk-icon medium">🏗️</div>
                  <div className="risk-details">
                    <h5>Material Cost Fluctuation</h5>
                    <p>Steel prices volatile due to market conditions</p>
                    <div className="mitigation">
                      AI Mitigation: Lock in prices with suppliers now
                    </div>
                    <div className="ai-confidence">🧠 87% confidence</div>
                  </div>
                  <div className="risk-probability">65%</div>
                </div>
                
                <div className="risk-item">
                  <div className="risk-icon high">📋</div>
                  <div className="risk-details">
                    <h5>Permit Approval Delays</h5>
                    <p>City planning department backlog</p>
                    <div className="mitigation">
                      AI Mitigation: Fast-track application submitted
                    </div>
                    <div className="ai-confidence">🧠 78% confidence</div>
                  </div>
                  <div className="risk-probability">45%</div>
                </div>
              </div>
            </div>

            <div className="predictive-risk-analysis">
              <h4>🔮 Predictive Risk Analysis</h4>
              <div className="prediction-grid">
                <div className="prediction-card">
                  <h5>Weather Prediction</h5>
                  <div className="prediction-timeline">
                    <div className="prediction-bar" style={{ width: '30%', background: '#22c55e' }}>Jun</div>
                    <div className="prediction-bar" style={{ width: '80%', background: '#ef4444' }}>Jul</div>
                    <div className="prediction-bar" style={{ width: '60%', background: '#f59e0b' }}>Aug</div>
                    <div className="prediction-bar" style={{ width: '25%', background: '#22c55e' }}>Sep</div>
                  </div>
                </div>
                <div className="prediction-card">
                  <h5>Market Volatility</h5>
                  <div className="volatility-chart">
                    <div className="vol-indicator low">Low</div>
                    <div className="vol-indicator medium active">Medium</div>
                    <div className="vol-indicator high">High</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const TemplateLibrary: React.FC = () => (
    <div className="modal-overlay" onClick={() => setShowTemplateLibrary(false)}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📚 Template Library v2.0</h2>
          <button onClick={() => setShowTemplateLibrary(false)}>✕</button>
        </div>
        
        <div className="template-container">
          <div className="template-categories">
            <button className="category-btn active">All Templates</button>
            <button className="category-btn">Financial</button>
            <button className="category-btn">Real Estate</button>
            <button className="category-btn">Compliance</button>
            <button className="category-btn">Construction</button>
            <button className="category-btn">AI Enhanced</button>
          </div>
          
          <div className="template-grid">
            {templates.map(template => (
              <div key={template.id} className="template-card">
                <div className="template-header">
                  <h4>{template.name}</h4>
                  <span className="template-type">{template.type}</span>
                </div>
                <p className="template-description">{template.description}</p>
                <div className="template-code-preview">
                  <code>{template.code.substring(0, 100)}...</code>
                </div>
                <div className="template-ai-features">
                  <span className="ai-feature">🧠 AI Optimized</span>
                  <span className="ai-feature">🎯 Smart Routing</span>
                </div>
                <div className="template-actions">
                  <button className="btn-secondary">Preview</button>
                  <button className="btn-primary">Use Template</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: '#ffffff',
      color: '#1a1a1a',
      height: '100vh',
      overflow: 'hidden'
    }}>
      {/* Enhanced Responsive Header */}
      <header className="app-header">
        <div className="header-content">
          {isMobile && (
            <button 
              className="mobile-menu-toggle"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              ☰
            </button>
          )}
          
          <div className="header-left">
            {!isMobile && (
              <>
                <button 
                  className="primary-button ai-hub-btn"
                  onClick={() => openModal('aiHub')}
                >
                  🧠 AI Hub
                </button>
                <button 
                  className="secondary-button"
                  onClick={() => openModal('predictiveAnalytics')}
                >
                  📊 Analytics
                </button>
                <button 
                  className="secondary-button"
                  onClick={() => setShowIoTDashboard(true)}
                >
                  📡 IoT
                </button>
                <button 
                  className="secondary-button workflows-btn"
                  onClick={() => openModal('workflowEngine')}
                >
                  🔄 Workflows
                </button>
              </>
            )}
            
            {/* Mobile Chat/Workspace Toggle */}
            {isMobile && (
              <div className="mobile-view-toggle">
                <button 
                  className={`toggle-btn ${mobileView === 'chat' ? 'active' : ''}`}
                  onClick={() => setMobileView('chat')}
                >
                  Chat
                </button>
                <button 
                  className={`toggle-btn ${mobileView === 'workspace' ? 'active' : ''}`}
                  onClick={() => setMobileView('workspace')}
                >
                  Workspace
                </button>
              </div>
            )}
          </div>
          
          <div className="header-right">
            {!isMobile && (
              <div className="ai-status-global enhanced">
                <div className="ai-status-dot pulsing"></div>
                <span>AI Orchestrator</span>
                <div className="ai-activity-count">23</div>
              </div>
            )}
            
            {!isMobile && (
              <div className="smart-routing-indicator">
                <span className="routing-icon">🎯</span>
                <span>Smart Routing</span>
                <div className="routing-efficiency">+67%</div>
              </div>
            )}
            
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="project-selector"
            >
              <option>Austin Residential</option>
              <option>Dallas Commercial</option>
              <option>Houston Renovation</option>
            </select>
            
            {!isMobile && (
              <button 
                className="secondary-button"
                onClick={() => openModal('collaborateModal')}
              >
                🤝 Collaborate
              </button>
            )}
          </div>
        </div>

      {/* Mobile Menu Overlay */}
      {isMobile && showMobileMenu && (
        <div className="mobile-menu-overlay" onClick={() => setShowMobileMenu(false)}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-header">
              <h3>Dashboard Menu</h3>
              <button onClick={() => setShowMobileMenu(false)}>✕</button>
            </div>
            <div className="mobile-menu-content">
              <button 
                className="mobile-menu-item home-item"
                onClick={() => { setCurrentView('cards'); setShowMobileMenu(false); }}
              >
                🏠 Dashboard Home
                <span className="menu-badge home">Main</span>
              </button>
              <button 
                className="mobile-menu-item primary"
                onClick={() => { openModal('aiHub'); setShowMobileMenu(false); }}
              >
                🧠 AI Orchestrator Hub
                <span className="menu-badge">23 active</span>
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { openModal('predictiveAnalytics'); setShowMobileMenu(false); }}
              >
                📊 Predictive Analytics
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { openModal('workflowEngine'); setShowMobileMenu(false); }}
              >
                🔄 Smart Workflows
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { openModal('smartRoutingPanel'); setShowMobileMenu(false); }}
              >
                🎯 Task Routing
                <span className="menu-badge success">+67%</span>
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { openModal('budgetModal'); setShowMobileMenu(false); }}
              >
                💰 Budget Tracker
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { openModal('tasksModal'); setShowMobileMenu(false); }}
              >
                ✅ Task Manager
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { openModal('collaborateModal'); setShowMobileMenu(false); }}
              >
                🤝 Team Collaboration
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { openModal('quickExportModal'); setShowMobileMenu(false); }}
              >
                📤 Quick Export
              </button>
              <div className="mobile-menu-divider"></div>
              <button 
                className="mobile-menu-item"
                onClick={() => { setShowVoiceCommand(true); setShowMobileMenu(false); }}
              >
                🎤 Voice Commands
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { setShowSmartSearch(true); setShowMobileMenu(false); }}
              >
                🔍 Smart Search
              </button>
              <button 
                className="mobile-menu-item"
                onClick={() => { setShowIoTDashboard(true); setShowMobileMenu(false); }}
              >
                📡 IoT Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
      </header>

      {/* Responsive Main Layout */}
      <div className="main-layout">
        
        {/* Responsive Left Sidebar - Show in Chat mode on mobile or always on desktop */}
        <div className={`left-sidebar ${sidebarCollapsed ? 'collapsed' : ''} ${isMobile ? (mobileView === 'chat' ? 'mobile-visible' : 'mobile-hidden') : ''}`}>
          {!isMobile && (
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              {sidebarCollapsed ? '→' : '←'}
            </button>
          )}
          
          {/* Mobile Chat Layout */}
          {isMobile && mobileView === 'chat' ? (
            <div className="mobile-chat-layout">
              {/* Mobile Chat Header */}
              <div className="mobile-chat-header">
                <div className="mobile-chat-brand">
                  <span className="mobile-housei-logo">HOUSEI</span>
                </div>
                <div className="mobile-chat-controls">
                  <button className="mobile-chat-btn" onClick={() => setShowAIHub(true)}>
                    🧠
                  </button>
                  <button className="mobile-chat-btn" onClick={() => setShowSmartSearch(true)}>
                    🔍
                  </button>
                  <button className="mobile-chat-btn" onClick={() => setShowVoiceCommand(true)}>
                    🎤
                  </button>
                </div>
              </div>

              {/* New Project Button */}
              <div className="mobile-new-project-section">
                <button className="mobile-new-project-btn">
                  + New Project
                </button>
              </div>

              {/* Mobile Chat Messages Area */}
              <div className="mobile-chat-messages">
                <div className="mobile-chat-date">
                  Jun 10, 2025 • AI Orchestrator Active
                </div>

                <div className="mobile-user-message">
                  <div className="mobile-message-content">
                    Show me predictive analytics for Austin market and optimize agent workloads using AI orchestrator
                  </div>
                  <div className="mobile-message-time">10:30 AM</div>
                </div>

                {messages.map(message => (
                  <div key={message.id} className="mobile-agent-message">
                    <div className="mobile-message-header">
                      <div className="mobile-message-avatar">{message.avatar}</div>
                      <div className="mobile-message-info">
                        <span className="mobile-message-sender">{message.sender}</span>
                        <span className="mobile-message-role">{message.role}</span>
                      </div>
                      <div className="mobile-message-status" style={{ background: getStatusBadgeColor(message.status) }}>
                        {message.status}
                      </div>
                    </div>
                    <div className="mobile-message-text">
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile Chat Input */}
              <div className="mobile-chat-input-section">
                <div className="mobile-input-container">
                  <button className="mobile-add-btn">+</button>
                  <div className="mobile-input-field">
                    <input 
                      type="text" 
                      placeholder="Type your message..."
                      className="mobile-text-input"
                    />
                    <button className="mobile-voice-btn" onClick={() => setShowVoiceCommand(true)}>
                      🎤
                    </button>
                    <button className="mobile-send-btn">
                      ➤
                    </button>
                  </div>
                </div>
                <div className="mobile-model-info">
                  <span>claude-4-sonnet + AI Orchestrator</span>
                </div>
              </div>
            </div>
          ) : (
            /* Desktop Chat Layout */
            <>
              <div className="chat-header">
                <div className="chat-header-content">
                  <button className="housei-logo">
                    <span>{sidebarCollapsed && !isMobile ? 'H' : 'HOUSEI'}</span>
                  </button>
                </div>
                {!sidebarCollapsed && !isMobile && (
                  <div className="new-project-btn-container">
                    <button className="new-project-btn">
                      <span>+</span>
                      New Project
                    </button>
                  </div>
                )}
              </div>

              {!sidebarCollapsed && (
                <>
                  <div className="chat-date">
                    Jun 10, 2025 • AI Orchestrator Active
                  </div>

                  <div className="chat-user-info">
                    <span className="user-label">Project Owner</span>
                    <div className="user-avatar">P</div>
                  </div>

                  <div className="chat-messages">
                    <div className="user-message">
                      Show me predictive analytics for Austin market and optimize agent workloads using AI orchestrator
                    </div>

                    {messages.map(message => (
                      <div key={message.id} className="agent-message">
                        <div className="message-header">
                          <div className="message-avatar">{message.avatar}</div>
                          <span className="message-sender">{message.sender}</span>
                          <span className="message-role">{message.role}</span>
                          <span 
                            className="message-status"
                            style={{ background: getStatusBadgeColor(message.status) }}
                          >
                            {message.status}
                          </span>
                        </div>
                        <div className="message-content">{message.content}</div>
                      </div>
                    ))}
                  </div>

                  <div className="chat-input-section">
                    <div className="chat-help-text">
                      @ to chat, # to select, / for commands, 🎤 for voice
                    </div>
                    <div className="chat-input-container">
                      <button className="chat-add-btn">+</button>
                      <button className="chat-model-btn">
                        <div className="model-icon">🧠</div>
                        <span>claude-4-sonnet + AI Orchestrator</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Responsive Center Panel - Show in Workspace mode on mobile or always on desktop */}
        <div className={`center-panel ${isMobile ? (mobileView === 'workspace' ? 'mobile-visible' : 'mobile-hidden') : ''}`}>
          <div className="center-panel-header">
            <h2>Agent Dashboard v2.0</h2>
            <div className="view-tabs">
              {(['cards', 'code', 'timeline'] as const).map(view => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`view-tab ${currentView === view ? 'active' : ''}`}
                >
                  {isMobile ? view.charAt(0).toUpperCase() : view.charAt(0).toUpperCase() + view.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          <div className="center-panel-content">
            {currentView === 'cards' && (
              <div className="cards-view">
                <div className="cards-controls enhanced">
                  <div className="filter-section">
                    <label>Filter:</label>
                    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="working">Working</option>
                      <option value="thinking">Thinking</option>
                      <option value="idle">Idle</option>
                    </select>
                  </div>
                  
                  {!isMobile && (
                    <div className="sort-section">
                      <label>Sort by:</label>
                      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="name">Name</option>
                        <option value="completion">Completion</option>
                        <option value="response">Response</option>
                        <option value="workload">Workload</option>
                        <option value="efficiency">Efficiency</option>
                      </select>
                    </div>
                  )}
                  
                  <div className="ai-controls">
                    <button 
                      className={`ai-toggle ${aiOrchestrator ? 'active' : ''}`}
                      onClick={() => openModal('aiHub')}
                    >
                      🧠 {isMobile ? 'AI' : 'AI Orchestrator'}
                      <div className="toggle-example">{isMobile ? '23' : '23 actions today'}</div>
                    </button>
                    {!isMobile && (
                      <button 
                        className={`ai-toggle ${smartRouting ? 'active' : ''}`}
                        onClick={() => openModal('smartRoutingPanel')}
                      >
                        🎯 Smart Routing
                        <div className="toggle-example">+67% efficiency</div>
                      </button>
                    )}
                  </div>
                </div>
                
                <div className="agents-grid">
                  {filteredAndSortedAgents.map(agent => (
                    <AgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              </div>
            )}
            {currentView === 'code' && <CodeView />}
            {currentView === 'timeline' && <TimelineView />}
          </div>
        </div>

        {/* Responsive Right Sidebar */}
        {!isMobile && (
          <div className="right-sidebar">
            {/* Enhanced Project Overview */}
            <div className="project-overview">
              <h3>Project Intelligence</h3>
              
              <div className="ai-insights-mini">
                <div className="insight-mini active">
                  <span className="insight-mini-icon">🎯</span>
                  <span className="insight-mini-text">AI routed task: Alex→Jennifer (4hrs→45min)</span>
                  <div className="insight-mini-time">Just now</div>
                </div>
                <div className="insight-mini">
                  <span className="insight-mini-icon">⚡</span>
                  <span className="insight-mini-text">Code optimized: 62% performance boost</span>
                  <div className="insight-mini-time">2 min ago</div>
                </div>
                <div className="insight-mini">
                  <span className="insight-mini-icon">💰</span>
                  <span className="insight-mini-text">Timeline optimized: $18K saved</span>
                  <div className="insight-mini-time">5 min ago</div>
                </div>
              </div>
              
              <div className="overview-cards">
                <div className="overview-card enhanced">
                  <div className="overview-value">$585K</div>
                  <div className="overview-label">Current Value</div>
                  <div className="overview-trend">+8.2% ↗️</div>
                </div>
                <div className="overview-card enhanced">
                  <div className="overview-value">85%</div>
                  <div className="overview-label">Progress</div>
                  <div className="overview-trend">On Track ✅</div>
                </div>
              </div>
              
              <div className="action-buttons-grid">
                <button className="action-btn-mini" onClick={() => openModal('predictiveAnalytics')}>
                  📊 Analytics
                </button>
                <button className="action-btn-mini" onClick={() => setShowIoTDashboard(true)}>
                  📡 IoT
                </button>
                <button className="action-btn-mini" onClick={() => openModal('budgetModal')}>
                  💰 Budget
                </button>
                <button className="action-btn-mini" onClick={() => openModal('tasksModal')}>
                  ✅ Tasks
                </button>
              </div>
            </div>

            <div className="sidebar-content">
              {/* AI Insights Section */}
              <div className="sidebar-section">
                <h4>🧠 AI Insights</h4>
                <div className="insights-container-mini">
                  {aiInsights.slice(0, 3).map(insight => (
                    <div key={insight.id} className="insight-item-mini">
                      <div className="insight-mini-header">
                        <span>{getInsightIcon(insight.type)}</span>
                        <span className={`impact-badge ${insight.impact}`}>{insight.impact}</span>
                      </div>
                      <div className="insight-mini-title">{insight.title}</div>
                      <div className="insight-mini-desc">{insight.description}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Project Phases */}
              <div className="sidebar-section">
                <h4>📋 Project Phases</h4>
                <div className="phases-list">
                  {phases.map((phase, index) => (
                    <div key={phase.id} className={`phase-item enhanced ${phase.status}`}>
                      <div className="phase-marker">
                        {phase.status === 'completed' ? '✓' : index + 1}
                      </div>
                      <div className="phase-content">
                        <div className="phase-title">{phase.title}</div>
                        <div className="phase-subtitle">{phase.subtitle}</div>
                        {phase.progress && (
                          <div className="phase-progress">{phase.progress}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="sidebar-section">
                <h4>⚡ Quick Actions</h4>
                <div className="quick-actions-grid">
                  <button className="quick-action-btn" onClick={() => setShowVoiceCommand(true)}>
                    🎤 Voice
                  </button>
                  <button className="quick-action-btn" onClick={() => setShowSmartSearch(true)}>
                    🔍 Search
                  </button>
                  <button className="quick-action-btn" onClick={() => openModal('quickExportModal')}>
                    📤 Export
                  </button>
                  <button className="quick-action-btn" onClick={() => setShowShareModal(true)}>
                    🤝 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Responsive Floating Action Buttons */}
      {!isMobile && (
        <div className="floating-actions">
          <button 
            className="fab main-fab"
            onClick={() => openModal('aiHub')}
            title="AI Hub"
          >
            🧠
          </button>
          <button 
            className="fab"
            onClick={() => setShowVoiceCommand(true)}
            title="Voice Commands"
          >
            🎤
          </button>
          <button 
            className="fab"
            onClick={() => setShowSmartSearch(true)}
            title="Smart Search"
          >
            🔍
          </button>
          <button 
            className="fab"
            onClick={() => openModal('predictiveAnalytics')}
            title="Predictive Analytics"
          >
            📊
          </button>
        </div>
      )}

      {/* Mobile-only: Floating Button Toggle is also removed since no floating buttons */}

      {/* Modals */}
      {showAgentModal && <AgentModal />}
      {showAIHub && <AIHubModal />}
      {showPredictiveAnalytics && <PredictiveAnalyticsModal />}
      {showVoiceCommand && <VoiceCommandModal />}
      {showSmartSearch && <SmartSearchModal />}
      {showIoTDashboard && <IoTDashboardModal />}
      {showTemplateLibrary && <TemplateLibrary />}
      {showWorkflowEngine && <WorkflowEngineModal />}
      {showDeployModal && <DeployModal />}
      {showCodeOptimizeModal && <CodeOptimizeModal />}
      {showBudgetModal && <BudgetModal />}
      {showTasksModal && <TasksModal />}
      {showTimelineAIOptimize && <TimelineAIOptimizeModal />}
      {showExportModal && <ExportModal />}
      {showSmartRoutingPanel && <SmartRoutingPanel />}
      {showCollaborateModal && <CollaborateModal />}
      {showQuickExportModal && <QuickExportModal />}
      {showShareModal && <ShareModal />}

      <style>{`
        /* Base Responsive Styles - Black & White Theme */
        * {
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
          background: #000000;
          color: #ffffff;
        }

        /* Mobile View Toggle Styles */
        .mobile-view-toggle {
          display: flex;
          background: #1a1a1a;
          border-radius: 10px;
          padding: 3px;
          gap: 2px;
          border: 1px solid #333333;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .toggle-btn {
          padding: 8px 16px;
          border: none;
          background: transparent;
          color: #9ca3af;
          font-size: 14px;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          min-width: 80px;
          position: relative;
          overflow: hidden;
        }

        .toggle-btn:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s;
        }

        .toggle-btn:hover:before {
          left: 100%;
        }

        .toggle-btn.active {
          background: #ffffff;
          color: #1a1a1a;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transform: translateY(-1px);
        }

        .toggle-btn:hover:not(.active) {
          color: #e5e7eb;
          background: rgba(255, 255, 255, 0.05);
        }

        /* Mobile Chat Layout - Full Screen Design */
        .mobile-chat-layout {
          height: calc(100vh - 60px);
          width: 100vw;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          position: fixed;
          top: 60px;
          left: 0;
          z-index: 1000;
        }

        .mobile-chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
          flex-shrink: 0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .mobile-housei-logo {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          letter-spacing: 0.5px;
        }

        .mobile-chat-controls {
          display: flex;
          gap: 10px;
        }

        .mobile-chat-btn {
          width: 36px;
          height: 36px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 10px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .mobile-chat-btn:hover {
          background: #e5e7eb;
          transform: translateY(-1px);
        }

        .mobile-new-project-section {
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: #f8f9fa;
          flex-shrink: 0;
        }

        .mobile-new-project-btn {
          width: 100%;
          background: #1a1a1a;
          border: none;
          border-radius: 14px;
          color: white;
          padding: 14px 20px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .mobile-new-project-btn:hover {
          background: #2a2a2a;
          transform: translateY(-1px);
        }

        .mobile-chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          background: #ffffff;
          width: 100%;
          box-sizing: border-box;
        }

        .mobile-chat-date {
          text-align: center;
          color: #6b7280;
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 24px;
          padding: 10px 20px;
          background: #f8f9fa;
          border-radius: 24px;
          display: inline-block;
          width: calc(100% - 40px);
          margin-left: 20px;
          text-align: center;
        }

        .mobile-user-message {
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          width: 100%;
        }

        .mobile-message-content {
          background: #3b82f6;
          color: white;
          padding: 16px 20px;
          border-radius: 20px 20px 6px 20px;
          max-width: 85%;
          font-size: 15px;
          line-height: 1.5;
          word-wrap: break-word;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
        }

        .mobile-message-time {
          font-size: 12px;
          color: #9ca3af;
          margin-top: 6px;
          margin-right: 4px;
        }

        .mobile-agent-message {
          margin-bottom: 28px;
          width: 100%;
        }

        .mobile-message-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .mobile-message-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .mobile-message-info {
          flex: 1;
        }

        .mobile-message-sender {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          display: block;
        }

        .mobile-message-role {
          font-size: 12px;
          color: #666666;
        }

        .mobile-message-status {
          font-size: 11px;
          color: white;
          padding: 3px 8px;
          border-radius: 6px;
          font-weight: 600;
        }

        .mobile-message-text {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          padding: 16px 20px;
          border-radius: 6px 20px 20px 20px;
          color: #1a1a1a;
          font-size: 15px;
          line-height: 1.6;
          max-width: 85%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .mobile-chat-input-section {
          border-top: 1px solid #e5e7eb;
          background: #ffffff;
          padding: 20px;
          flex-shrink: 0;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
        }

        .mobile-input-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }

        .mobile-add-btn {
          width: 44px;
          height: 44px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 12px;
          cursor: pointer;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666666;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .mobile-add-btn:hover {
          background: #e5e7eb;
          transform: scale(1.05);
        }

        .mobile-input-field {
          flex: 1;
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border: 2px solid #e5e7eb;
          border-radius: 24px;
          padding: 6px;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .mobile-input-field:focus-within {
          border-color: #3b82f6;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .mobile-text-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 12px 16px;
          font-size: 16px;
          background: transparent;
          color: #1a1a1a;
          min-height: 20px;
        }

        .mobile-text-input::placeholder {
          color: #9ca3af;
        }

        .mobile-voice-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: #e5e7eb;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .mobile-voice-btn:hover {
          background: #d1d5db;
          transform: scale(1.05);
        }

        .mobile-send-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
        }

        .mobile-send-btn:hover {
          background: linear-gradient(135deg, #2563eb, #059669);
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .mobile-model-info {
          text-align: center;
          font-size: 12px;
          color: #666666;
          margin-top: 6px;
          font-weight: 500;
        }
        .mobile-chat-controls {
          display: flex;
          gap: 8px;
        }

        .mobile-chat-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .mobile-chat-btn:hover {
          background: #e5e7eb;
          transform: translateY(-1px);
        }

        .mobile-new-project {
          padding: 8px 16px;
        }

        .mobile-new-project-btn {
          background: #1a1a1a;
          border: none;
          border-radius: 8px;
          color: white;
          padding: 8px 12px;
          fontSize: 12px;
          fontWeight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
          width: 100%;
          justify-content: center;
        }

        .chat-date {
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: #6b7280;
          fontSize: 12px;
          fontWeight: 500;
          padding: 12px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
        }

        .date-text {
          font-weight: 600;
        }

        .mobile-ai-status {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
        }

        .mobile-ai-status .ai-status-dot {
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .mobile-ai-status .ai-activity-count {
          background: #22c55e;
          color: white;
          font-size: 8px;
          padding: 1px 4px;
          border-radius: 6px;
          font-weight: 600;
          min-width: 14px;
          text-align: center;
        }

        .chat-user-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
        }

        .user-info-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .mobile-chat-actions {
          display: flex;
          gap: 6px;
        }

        .chat-action-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .chat-action-btn:hover {
          background: #e5e7eb;
          transform: translateY(-1px);
        }

        /* Enhanced mobile messages */
        .user-message {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 16px 16px 4px 16px;
          padding: 16px;
          margin-bottom: 16px;
          color: #1a1a1a;
          fontSize: 14px;
          lineHeight: 1.5;
          margin-left: auto;
          max-width: 85%;
          position: relative;
        }

        .message-text {
          margin-bottom: 8px;
        }

        .message-timestamp {
          font-size: 11px;
          color: #9ca3af;
          text-align: right;
        }

        .agent-message {
          margin-bottom: 24px;
        }

        .message-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .message-sender-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .message-meta {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .message-time {
          font-size: 10px;
          color: #9ca3af;
        }

        .message-content {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 4px 16px 16px 16px;
          padding: 16px;
          color: #1a1a1a;
          lineHeight: 1.5;
          fontSize: 14px;
          position: relative;
        }

        .mobile-message-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          padding-top: 12px;
          border-top: 1px solid #f0f0f0;
        }

        .message-action-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .message-action-btn:hover {
          background: #e5e7eb;
          transform: scale(1.1);
        }

        /* Typing indicator */
        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          margin-bottom: 16px;
        }

        .typing-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
        }

        .typing-content {
          flex: 1;
        }

        .typing-text {
          font-size: 12px;
          color: #666666;
          margin-bottom: 4px;
        }

        .typing-dots {
          display: flex;
          gap: 4px;
        }

        .typing-dots span {
          width: 6px;
          height: 6px;
          background: #3b82f6;
          border-radius: 50%;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-dots span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .typing-dots span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes typing {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        /* Enhanced mobile input */
        .mobile-help-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          font-size: 10px;
          color: #9ca3af;
          margin-bottom: 12px;
        }

        .mobile-help-grid span {
          background: #f8f9fa;
          padding: 4px 6px;
          border-radius: 4px;
          text-align: center;
          font-weight: 500;
        }

        .chat-input-field {
          flex: 1;
          display: flex;
          align-items: center;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 4px;
          gap: 8px;
        }

        .mobile-chat-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 12px;
          font-size: 14px;
          background: transparent;
        }

        .mobile-chat-input::placeholder {
          color: #9ca3af;
        }

        .mobile-input-actions {
          display: flex;
          gap: 4px;
          padding-right: 4px;
        }

        .input-action-btn {
          width: 36px;
          height: 36px;
          border: none;
          background: #f8f9fa;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .input-action-btn:hover {
          background: #e5e7eb;
          transform: scale(1.05);
        }

        .send-btn {
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
        }

        .send-btn:hover {
          background: linear-gradient(135deg, #2563eb, #059669);
        }

        .mobile-model-selector {
          margin-top: 8px;
        }

        .mobile-model-btn {
          width: 100%;
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #1a1a1a;
          padding: 8px 12px;
          fontSize: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .mobile-model-btn:hover {
          background: #e5e7eb;
        }

        .model-badge {
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 6px;
          font-weight: 600;
          margin-left: auto;
        }

        .mobile-quick-actions {
          display: flex;
          gap: 8px;
          margin-top: 12px;
          overflow-x: auto;
          padding-bottom: 4px;
        }

        .quick-action {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 20px;
          padding: 8px 12px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          color: #1a1a1a;
        }

        .quick-action:hover {
          background: #f8f9fa;
          transform: translateY(-1px);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .left-sidebar.mobile-visible {
          position: fixed;
          top: 60px;
          left: 0;
          width: 100%;
          height: calc(100vh - 60px);
          z-index: 150;
          background: #ffffff;
          border-right: none;
        }

        .left-sidebar.mobile-hidden {
          display: none;
        }

        .center-panel.mobile-visible {
          width: 100%;
          margin-left: 0;
        }

        .center-panel.mobile-hidden {
          display: none;
        }
        .app-header {
          height: 60px;
          background: #000000;
          border-bottom: 1px solid #333333;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1001;
          width: 100%;
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          height: 100%;
          max-width: 100%;
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          color: #ffffff;
        }

        .header-left, .header-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .project-selector {
          background: #1a1a1a;
          border: 1px solid #333333;
          color: #ffffff;
          border-radius: 8px;
          padding: 8px 12px;
          fontSize: 14px;
          cursor: pointer;
          max-width: 200px;
        }

        /* Mobile Menu Styles */
        .mobile-menu-overlay {
          position: fixed;
          top: 60px;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 200;
          display: none;
          backdrop-filter: blur(4px);
        }

        .mobile-menu {
          background: white;
          width: 320px;
          height: 100%;
          box-shadow: 2px 0 16px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
        }

        .mobile-menu-header h3 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .mobile-menu-header button {
          width: 32px;
          height: 32px;
          border: none;
          background: #f8f9fa;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666666;
        }

        .mobile-menu-content {
          flex: 1;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          overflow-y: auto;
        }

        .mobile-menu-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          padding: 16px 20px;
          border-radius: 12px;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          color: #1a1a1a;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .mobile-menu-item:hover {
          background: #f8f9fa;
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .mobile-menu-item:active {
          transform: translateY(0);
        }

        .mobile-menu-item.primary {
          background: linear-gradient(135deg, #3b82f6, #1d4ed8);
          color: white;
          border-color: #3b82f6;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .mobile-menu-item.primary:hover {
          background: linear-gradient(135deg, #2563eb, #1e40af);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }

        .menu-badge {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 11px;
          padding: 2px 8px;
          border-radius: 12px;
          font-weight: 600;
        }

        .mobile-menu-item.home-item {
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          color: #1a1a1a;
          border: 2px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          font-weight: 600;
        }

        .mobile-menu-item.home-item:hover {
          background: linear-gradient(135deg, #e5e7eb, #f8f9fa);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
          border-color: #d1d5db;
        }

        .menu-badge.home {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .mobile-menu-divider {
          height: 1px;
          background: #e5e7eb;
          margin: 12px 0;
        }

        @media (max-width: 768px) {
          .mobile-menu-overlay {
            display: block;
          }
        }

        @media (max-width: 480px) {
          .mobile-menu {
            width: 280px;
          }

          .mobile-menu-content {
            padding: 16px;
          }

          .mobile-menu-item {
            padding: 14px 16px;
            font-size: 13px;
          }
        }

        /* Main Layout Responsive */
        .main-layout {
          display: flex;
          height: calc(100vh - 60px);
          overflow: hidden;
          margin-top: 60px;
        }

        /* Left Sidebar Responsive */
        .left-sidebar {
          width: 320px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: relative;
          transition: all 0.3s ease;
          flex-shrink: 0;
        }

        .left-sidebar.collapsed {
          width: 60px;
        }

        .left-sidebar.mobile {
          position: fixed;
          top: 60px;
          left: -320px;
          height: calc(100vh - 60px);
          z-index: 150;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
          transition: left 0.3s ease;
        }

        .left-sidebar.mobile.show {
          left: 0;
        }

        .sidebar-toggle {
          position: absolute;
          top: 50%;
          right: -12px;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 50%;
          cursor: pointer;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        }

        .chat-header {
          height: 50px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
        }

        .chat-header-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .housei-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #1a1a1a;
          fontSize: 14px;
          fontWeight: 600;
          cursor: pointer;
          padding: 6px 8px;
          borderRadius: 6px;
        }

        .new-project-btn-container {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .new-project-btn {
          background: #1a1a1a;
          border: none;
          border-radius: 6px;
          color: white;
          padding: 4px 8px;
          fontSize: 11px;
          fontWeight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .chat-date {
          text-align: center;
          color: #6b7280;
          fontSize: 12px;
          fontWeight: 500;
          padding: 12px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
        }

        .chat-user-info {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          padding: 12px 20px;
          border-bottom: 1px solid #e5e7eb;
          background: #ffffff;
        }

        .user-label {
          color: #666666;
          fontSize: 14px;
          fontWeight: 500;
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          background: #1a1a1a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          fontSize: 14px;
          fontWeight: 600;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 20px;
          background: #ffffff;
        }

        .user-message {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 16px;
          color: #1a1a1a;
          fontSize: 14px;
          lineHeight: 1.5;
          margin-left: auto;
          max-width: 85%;
        }

        .agent-message {
          margin-bottom: 24px;
        }

        .message-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .message-avatar {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          fontSize: 12px;
          background: #1a1a1a;
          color: white;
        }

        .message-sender {
          color: #666666;
          fontSize: 14px;
          fontWeight: 500;
        }

        .message-role {
          color: #9ca3af;
          fontSize: 12px;
        }

        .message-status {
          color: white;
          fontSize: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          fontWeight: 600;
          margin-left: auto;
        }

        .message-content {
          color: #1a1a1a;
          lineHeight: 1.5;
          fontSize: 14px;
        }

        .chat-input-section {
          border-top: 1px solid #e5e7eb;
          padding: 16px;
          background: #ffffff;
        }

        .chat-help-text {
          color: #9ca3af;
          fontSize: 12px;
          margin-bottom: 12px;
          font-style: italic;
        }

        .chat-input-container {
          display: flex;
          align-items: flex-end;
          gap: 8px;
        }

        .chat-add-btn {
          width: 36px;
          height: 36px;
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #666666;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .chat-model-btn {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          color: #1a1a1a;
          padding: 8px 12px;
          fontSize: 13px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
          min-width: 0;
        }

        .model-icon {
          width: 16px;
          height: 16px;
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          fontSize: 8px;
          flex-shrink: 0;
        }

        /* Center Panel Responsive */
        .center-panel {
          flex: 1;
          background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        .center-panel-header {
          height: 50px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          color: #1a1a1a;
        }

        .center-panel-header h2 {
          fontSize: 16px;
          fontWeight: 600;
          margin: 0;
        }

        .view-tabs {
          display: flex;
          gap: 8px;
        }

        .view-tab {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 6px 12px;
          color: #1a1a1a;
          fontSize: 12px;
          cursor: pointer;
          text-transform: capitalize;
          transition: all 0.2s ease;
        }

        .view-tab.active {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          border-color: #1a1a1a;
        }

        .center-panel-content {
          flex: 1;
          overflow: hidden;
        }

        .cards-view {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .agents-grid {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
          align-content: start;
        }

        /* Right Sidebar Responsive */
        .right-sidebar {
          width: 340px;
          background: #f8f9fa;
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          flex-shrink: 0;
        }

        .project-overview {
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .project-overview h3 {
          fontSize: 14px;
          fontWeight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .overview-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 16px 0;
        }

        .action-buttons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
        }

        .phases-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Floating Action Buttons Responsive */
        .floating-actions {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 1000;
        }

        .floating-actions.mobile {
          bottom: 20px;
          right: 16px;
          gap: 10px;
        }

        .fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          font-size: 18px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .fab:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .fab:active {
          transform: translateY(0);
        }

        .fab.main-fab {
          width: 64px;
          height: 64px;
          font-size: 22px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
        }

        .fab.main-fab:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(59, 130, 246, 0.4);
        }

        .fab.secondary-fab {
          background: linear-gradient(135deg, #6b7280, #4b5563);
        }

        .fab-pulse {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
          border: 2px solid white;
        }

        @media (max-width: 768px) {
          .floating-actions {
            bottom: 20px;
            right: 16px;
            gap: 12px;
          }

          .fab {
            width: 52px;
            height: 52px;
            font-size: 18px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          }

          .fab.main-fab {
            width: 60px;
            height: 60px;
            font-size: 22px;
            box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
          }

          .fab.secondary-fab {
            width: 48px;
            height: 48px;
            font-size: 16px;
          }

          /* Enhanced touch feedback */
          .fab:active {
            transform: scale(0.95);
          }
        }

        @media (max-width: 480px) {
          .floating-actions {
            bottom: 16px;
            right: 12px;
            gap: 10px;
          }

          .fab {
            width: 48px;
            height: 48px;
            font-size: 16px;
          }

          .fab.main-fab {
            width: 56px;
            height: 56px;
            font-size: 20px;
          }

          .fab.secondary-fab {
            width: 44px;
            height: 44px;
            font-size: 14px;
          }

          .fab-pulse {
            width: 10px;
            height: 10px;
          }
        }

        /* Agent Modal Mobile Styles */
        .agent-detail-modal.mobile {
          height: 95vh;
          max-height: 95vh;
        }

        .agent-modal-header {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .agent-avatar-large {
          width: 64px;
          height: 64px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 28px;
          font-weight: 600;
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .agent-modal-info {
          flex: 1;
        }

        .agent-modal-info h2 {
          margin: 0 0 4px 0;
          font-size: 20px;
          font-weight: 700;
        }

        .agent-modal-role {
          margin: 0 0 8px 0;
          color: #666666;
          font-size: 14px;
        }

        .agent-modal-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 12px;
          width: fit-content;
        }

        .agent-modal-status.active {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .agent-modal-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .status-details-mobile {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
        }

        .status-overview {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .status-badge-large {
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          text-align: center;
          color: white;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .status-badge-large.active {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        .status-badge-large.working {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .status-badge-large.thinking {
          background: linear-gradient(135deg, #6b7280, #4b5563);
        }

        .status-badge-large.idle {
          background: linear-gradient(135deg, #9ca3af, #6b7280);
        }

        .workload-section {
          background: white;
          border-radius: 8px;
          padding: 12px;
        }

        .workload-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .workload-efficiency {
          color: #3b82f6;
        }

        .workload-bar-container {
          background: #e5e7eb;
          height: 8px;
          border-radius: 4px;
          overflow: hidden;
        }

        .workload-bar-large {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .current-task-mobile {
          background: rgba(59, 130, 246, 0.05);
          border: 1px solid rgba(59, 130, 246, 0.1);
          border-left: 4px solid #3b82f6;
          border-radius: 8px;
          padding: 16px;
          line-height: 1.5;
          color: #1a1a1a;
          font-size: 14px;
        }

        .metrics-grid-mobile {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .metric-card-mobile {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          text-align: center;
          transition: all 0.2s ease;
        }

        .metric-card-mobile:hover {
          background: #f1f3f4;
          transform: translateY(-2px);
        }

        .metric-value-large {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .metric-label-mobile {
          font-size: 11px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .performance-grid-mobile {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .perf-item-mobile {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
        }

        .perf-label {
          font-size: 12px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .perf-value {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .perf-bar {
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .perf-bar div {
          height: 100%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .perf-indicator {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .perf-indicator.good {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .activity-list-mobile {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .activity-item-mobile {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .activity-time {
          font-size: 11px;
          color: #9ca3af;
          font-weight: 600;
          min-width: 60px;
        }

        .activity-desc {
          flex: 1;
          font-size: 13px;
          color: #1a1a1a;
        }

        .activity-status {
          font-size: 14px;
        }

        .activity-status.success {
          color: #22c55e;
        }

        .agent-ai-insights {
          background: rgba(139, 92, 246, 0.05);
          border: 1px solid rgba(139, 92, 246, 0.1);
          border-radius: 12px;
          padding: 16px;
        }

        .ai-insight-mobile {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          font-size: 13px;
          color: #1a1a1a;
        }

        .ai-insight-mobile:not(:last-child) {
          border-bottom: 1px solid rgba(139, 92, 246, 0.1);
        }

        .ai-insight-mobile .insight-icon {
          font-size: 16px;
          width: 24px;
          text-align: center;
        }

        .mobile-btn {
          flex: 1;
          padding: 14px 16px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        @media (max-width: 480px) {
          .metrics-grid-mobile {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .metric-card-mobile {
            padding: 12px;
          }

          .metric-value-large {
            font-size: 20px;
          }

          .agent-modal-header {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .agent-avatar-large {
            width: 56px;
            height: 56px;
            font-size: 24px;
          }

          .mobile-btn {
            padding: 12px 14px;
            font-size: 13px;
          }
        }

        /* Tablet Styles (768px - 1024px) */
        @media (max-width: 1024px) and (min-width: 769px) {
          .header-content {
            padding: 0 16px;
          }

          .left-sidebar {
            width: 300px;
          }

          .right-sidebar {
            width: 320px;
          }

          .agents-grid {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 16px;
            padding: 16px;
          }

          .floating-actions {
            bottom: 20px;
            right: 20px;
          }

          .fab {
            width: 52px;
            height: 52px;
            font-size: 16px;
          }

          .fab.main-fab {
            width: 60px;
            height: 60px;
            font-size: 20px;
          }

          /* Hide some non-essential buttons on tablet */
          .secondary-button:not(.ai-hub-btn):not(.workflows-btn) {
            display: none;
          }
        }

        /* Mobile Styles (max-width: 768px) */
        @media (max-width: 768px) {
          /* Ensure body accounts for fixed header */
          body {
            padding-top: 0;
          }

          /* Main layout adjustments for mobile */
          .main-layout {
            margin-top: 0;
            height: 100vh;
          }

          /* Hide desktop-only elements */
          .right-sidebar {
            display: none !important;
          }

          .secondary-button:not(.ai-hub-btn) {
            display: none;
          }

          .smart-routing-indicator {
            display: none;
          }

          /* Hide floating buttons on mobile */
          .floating-actions {
            display: none !important;
          }

          /* Mobile header adjustments */
          .mobile-menu-toggle {
            display: block;
          }

          .header-content {
            padding: 0 12px;
          }

          .header-left {
            gap: 8px;
            flex: 1;
          }

          .header-right {
            gap: 8px;
            flex-shrink: 0;
          }

          .project-selector {
            max-width: 120px;
            font-size: 12px;
            padding: 6px 8px;
          }

          /* Mobile view toggle adjustments */
          .mobile-view-toggle {
            flex: 1;
            max-width: 200px;
            background: #1a1a1a;
            border: 1px solid #333333;
          }

          .toggle-btn {
            padding: 6px 12px;
            font-size: 13px;
            min-width: 70px;
            color: #9ca3af;
          }

          .toggle-btn.active {
            background: #ffffff;
            color: #1a1a1a;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }

          .toggle-btn:hover:not(.active) {
            color: #e5e7eb;
            background: rgba(255, 255, 255, 0.08);
          }

          /* Mobile sidebar - Full Screen Chat */
          .left-sidebar.mobile-visible {
            position: fixed;
            top: 60px;
            left: 0;
            width: 100vw;
            height: calc(100vh - 60px);
            z-index: 1000;
            background: #ffffff;
            border-right: none;
          }

          .left-sidebar.mobile-hidden {
            display: none;
          }

          .sidebar-toggle {
            display: none;
          }

          /* Mobile center panel */
          .center-panel {
            margin-left: 0;
            width: 100%;
          }

          .center-panel.mobile-visible {
            width: 100%;
            margin-left: 0;
            margin-top: 0;
            height: calc(100vh - 60px);
            position: fixed;
            top: 60px;
            left: 0;
            z-index: 100;
            background: #ffffff;
          }

          .center-panel.mobile-hidden {
            display: none;
          }

          .center-panel-header {
            padding: 0 12px;
            height: 48px;
          }

          .center-panel-header h2 {
            font-size: 16px;
          }

          .view-tabs {
            gap: 4px;
          }

          .view-tab {
            padding: 6px 12px;
            font-size: 12px;
            min-width: 60px;
          }

          /* Mobile cards view */
          .cards-controls.enhanced {
            flex-direction: column;
            gap: 12px;
            padding: 12px;
            background: #f8f9fa;
          }

          .filter-section, .sort-section {
            flex: 1;
            min-width: 0;
          }

          .filter-section label, .sort-section label {
            font-size: 12px;
            font-weight: 600;
          }

          .filter-section select, .sort-section select {
            font-size: 13px;
            padding: 8px 12px;
            width: 100%;
          }

          /* Hide AI controls completely on mobile */
          .ai-controls {
            display: none !important;
          }

          /* Mobile agents grid */
          .agents-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 12px;
          }

          /* Mobile agent cards */
          .agent-card {
            padding: 16px;
            border-radius: 12px;
            min-height: 260px;
          }

          .agent-header {
            flex-direction: row;
            gap: 12px;
            align-items: flex-start;
          }

          .agent-avatar {
            width: 48px;
            height: 48px;
            font-size: 20px;
            flex-shrink: 0;
          }

          .agent-info h3 {
            font-size: 16px;
            margin-bottom: 4px;
          }

          .agent-role {
            font-size: 13px;
          }

          .agent-controls {
            margin-left: auto;
          }

          .control-btn {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }

          .priority-badge {
            font-size: 9px;
            padding: 2px 6px;
          }

          .agent-status {
            padding: 6px 10px;
            font-size: 12px;
            border-radius: 16px;
          }

          .workload-indicator {
            margin-left: auto;
          }

          .workload-bar {
            width: 35px;
            height: 3px;
          }

          .workload-text {
            font-size: 10px;
          }

          .agent-task {
            font-size: 13px;
            line-height: 1.4;
            margin-bottom: 16px;
            min-height: 36px;
          }

          .agent-metrics {
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
            margin-bottom: 12px;
          }

          .metric-value {
            font-size: 16px;
            margin-bottom: 2px;
          }

          .metric-label {
            font-size: 10px;
          }

          .agent-footer {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
            font-size: 11px;
          }

          .performance-stats {
            gap: 8px;
            width: 100%;
            justify-content: space-between;
          }

          .learning-progress {
            width: 100%;
            justify-content: space-between;
          }

          .learning-bar {
            width: 80px;
          }

          /* Hide complex AI alerts on mobile for cleaner look */
          .ai-action-alert,
          .ai-optimization-alert,
          .ai-suggestion-alert {
            display: none;
          }

          .smart-routing-badge,
          .ai-optimization-badge {
            top: -6px;
            right: -6px;
            padding: 3px 6px;
            font-size: 9px;
          }

          /* Mobile code view */
          .code-toolbar {
            padding: 8px 12px;
            flex-direction: column;
            gap: 12px;
            align-items: stretch;
          }

          .code-agent-tabs {
            overflow-x: auto;
            padding-bottom: 4px;
            gap: 2px;
            display: flex;
            white-space: nowrap;
            width: 100%;
          }

          .code-agent-tab {
            min-width: calc(100vw / 7 - 4px);
            max-width: calc(100vw / 7 - 4px);
            padding: 4px 2px;
            font-size: 9px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            border-radius: 4px;
          }

          .code-agent-tab-avatar {
            width: 14px;
            height: 14px;
            font-size: 7px;
            border-radius: 3px;
          }

          .code-controls {
            justify-content: space-between;
            flex-wrap: nowrap;
            gap: 4px;
            width: 100%;
          }

          .control-button {
            padding: 4px 6px;
            font-size: 9px;
            flex: 1;
            min-width: 0;
            border-radius: 4px;
          }

          /* Hide test mode on mobile */
          .control-button:nth-child(2) {
            display: none;
          }

          /* Move purple button to code editor toolbar */
          .editor-tabs {
            display: flex;
            background: #f8f9fa;
            border-bottom: 1px solid #e5e7eb;
            justify-content: space-between;
            align-items: center;
          }

          .editor-tabs-left {
            display: flex;
            flex: 1;
          }

          .mobile-fullscreen-btn {
            background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important;
            color: white !important;
            border: none !important;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 11px;
            cursor: pointer;
            margin-right: 8px;
            flex-shrink: 0;
          }

          .code-content-container {
            flex-direction: column;
            height: calc(100vh - 160px);
          }

          /* Mobile: Code editor first, then file section */
          .code-editor-area {
            order: 1;
            flex: 2;
            min-height: 60%;
          }

          /* Hide version control and AI code insights on mobile */
          .version-control,
          .ai-code-insights {
            display: none;
          }

          .code-sidebar {
            order: 2;
            width: 100%;
            max-height: 150px;
            border-right: none;
            border-top: 1px solid #e5e7eb;
            overflow-y: auto;
            flex: none;
          }

          .code-right-panel {
            display: none; /* Remove debugging section on mobile */
          }

          /* Hide debugging, performance and AI optimization sections on mobile */
          .debug-controls,
          .perf-metrics,
          .optimization-suggestions,
          .panel-section {
            display: none;
          }

          /* Mobile fullscreen code editor */
          .code-view.fullscreen .code-content-container {
            height: calc(100vh - 80px);
          }

          .code-view.fullscreen .code-sidebar {
            display: none; /* Hide sidebar in fullscreen */
          }

          .code-view.fullscreen .code-editor-area {
            flex: 1;
            min-height: 100%;
          }

          .code-editor {
            font-size: 10px;
          }

          .line-numbers {
            min-width: 40px;
            padding: 12px 8px;
          }

          .line-number {
            font-size: 9px;
            height: 14px;
          }

          .code-content {
            padding: 12px;
          }

          .code-line {
            min-height: 14px;
          }

          /* Mobile timeline view */
          .timeline-toolbar {
            padding: 12px;
            flex-direction: column;
            gap: 12px;
          }

          .timeline-controls {
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }

          .timeline-btn {
            padding: 8px 16px;
            font-size: 11px;
            min-width: 80px;
          }

          .timeline-filters {
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
          }

          .timeline-select {
            font-size: 12px;
            padding: 6px 10px;
            min-width: 120px;
          }

          .export-btn {
            padding: 8px 16px;
            font-size: 11px;
          }

          /* Mobile gantt chart */
          .gantt-container {
            overflow-x: auto;
          }

          .gantt-header {
            min-width: 600px;
          }

          .gantt-body {
            min-width: 600px;
          }

          .task-column {
            min-width: 200px;
            padding: 12px;
          }

          .task-name {
            font-size: 13px;
          }

          .task-assignee {
            font-size: 11px;
          }

          .task-ai-insights {
            font-size: 10px;
          }

          /* Mobile milestones */
          .milestones-container {
            padding: 16px 12px;
          }

          .milestone {
            flex-direction: column;
            gap: 12px;
            align-items: center;
            text-align: center;
          }

          .milestone-marker {
            width: 40px;
            height: 40px;
          }

          .milestone-number {
            font-size: 16px;
          }

          .milestone-content h4 {
            font-size: 16px;
          }

          .milestone-content p {
            font-size: 13px;
          }

          .milestone-dates {
            font-size: 11px;
          }

          .milestone-agent {
            font-size: 11px;
          }

          /* Mobile risks view */
          .risks-container {
            padding: 16px 12px;
          }

          .risk-summary {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .risk-card {
            padding: 20px;
          }

          .risk-card h3 {
            font-size: 13px;
          }

          .risk-count {
            font-size: 28px;
          }

          .risk-card p {
            font-size: 11px;
          }

          .risk-timeline {
            padding: 16px;
          }

          .risk-item {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
            text-align: left;
          }

          .risk-icon {
            width: 32px;
            height: 32px;
            font-size: 16px;
            align-self: center;
          }

          .risk-details h5 {
            font-size: 14px;
          }

          .risk-details p {
            font-size: 13px;
          }

          .risk-probability {
            font-size: 16px;
            align-self: center;
          }

          /* Mobile modal adjustments */
          .modal-overlay {
            padding: 16px 8px;
            align-items: flex-start;
            padding-top: 40px;
          }

          .modal-content {
            width: 100%;
            max-height: calc(100vh - 80px);
            border-radius: 12px 12px 0 0;
            margin-top: auto;
          }

          .modal-header {
            padding: 16px;
          }

          .modal-header h2 {
            font-size: 16px;
          }

          .modal-body {
            padding: 16px;
          }

          .modal-footer {
            padding: 16px;
          }

          /* Chat adjustments */
          .chat-header {
            height: 48px;
            padding: 0 12px;
          }

          .housei-logo span {
            font-size: 13px;
          }

          .new-project-btn {
            padding: 4px 8px;
            font-size: 10px;
          }

          .chat-date {
            padding: 10px 16px;
            font-size: 11px;
          }

          .chat-user-info {
            padding: 10px 16px;
          }

          .user-label {
            font-size: 13px;
          }

          .user-avatar {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }

          .chat-messages {
            padding: 12px 16px;
          }

          .user-message {
            padding: 12px;
            font-size: 13px;
            max-width: 90%;
          }

          .message-header {
            gap: 6px;
            margin-bottom: 8px;
          }

          .message-avatar {
            width: 20px;
            height: 20px;
            font-size: 10px;
          }

          .message-sender {
            font-size: 12px;
          }

          .message-role {
            font-size: 11px;
          }

          .message-status {
            font-size: 9px;
            padding: 1px 4px;
          }

          .message-content {
            font-size: 13px;
            line-height: 1.4;
          }

          .chat-input-section {
            padding: 12px;
          }

          .chat-help-text {
            font-size: 11px;
            margin-bottom: 8px;
          }

          .chat-add-btn {
            width: 32px;
            height: 32px;
          }

          .chat-model-btn {
            padding: 6px 10px;
            font-size: 12px;
          }

          .model-icon {
            width: 14px;
            height: 14px;
            font-size: 7px;
          }
        }

        /* Small Mobile Styles (max-width: 480px) */
        @media (max-width: 480px) {
          .header-content {
            padding: 0 8px;
          }

          .project-selector {
            max-width: 100px;
            font-size: 11px;
            padding: 4px 8px;
          }

          .left-sidebar {
            width: 280px;
          }

          .center-panel-header {
            padding: 0 8px;
            height: 44px;
          }

          .center-panel-header h2 {
            font-size: 14px;
          }

          .view-tab {
            padding: 4px 8px;
            font-size: 11px;
            min-width: 50px;
          }

          .agents-grid {
            padding: 8px;
            gap: 12px;
          }

          .agent-card {
            padding: 12px;
            min-height: 240px;
          }

          .agent-avatar {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .agent-info h3 {
            font-size: 15px;
          }

          .agent-role {
            font-size: 12px;
          }

          .control-btn {
            width: 24px;
            height: 24px;
            font-size: 11px;
          }

          .agent-task {
            font-size: 12px;
            min-height: 32px;
          }

          .metric-value {
            font-size: 14px;
          }

          .cards-controls.enhanced {
            padding: 8px;
          }

          .floating-actions {
            bottom: 16px;
            right: 12px;
            gap: 10px;
          }

          .fab {
            width: 48px;
            height: 48px;
            font-size: 16px;
          }

          .fab.main-fab {
            width: 56px;
            height: 56px;
            font-size: 20px;
          }

          .modal-overlay {
            padding: 8px 4px;
            padding-top: 20px;
          }

          .modal-content {
            max-height: calc(100vh - 40px);
            border-radius: 8px 8px 0 0;
          }

          .modal-header {
            padding: 12px;
          }

          .modal-header h2 {
            font-size: 14px;
          }

          .modal-body {
            padding: 12px;
          }

          .modal-footer {
            padding: 12px;
          }
        }

        /* Extra Small Mobile (max-width: 375px) */
        @media (max-width: 375px) {
          .header-content {
            padding: 0 6px;
          }

          .project-selector {
            max-width: 80px;
            font-size: 10px;
          }

          .ai-status-global.enhanced {
            padding: 3px 6px;
            font-size: 10px;
          }

          .center-panel-header h2 {
            font-size: 13px;
          }

          .view-tab {
            padding: 4px 6px;
            font-size: 10px;
            min-width: 45px;
          }

          .agent-card {
            padding: 10px;
            min-height: 220px;
          }

          .agent-avatar {
            width: 36px;
            height: 36px;
            font-size: 16px;
          }

          .floating-actions {
            bottom: 12px;
            right: 8px;
          }

          .fab {
            width: 44px;
            height: 44px;
            font-size: 14px;
          }

          .fab.main-fab {
            width: 52px;
            height: 52px;
            font-size: 18px;
          }
        }

        /* Agent Card Responsive */
        .agent-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          min-height: 320px;
        }

        @media (max-width: 768px) {
          .agent-card {
            padding: 16px;
            border-radius: 12px;
            min-height: 260px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .agent-header {
            flex-direction: row;
            gap: 12px;
            align-items: flex-start;
            margin-bottom: 12px;
          }

          .agent-avatar {
            width: 48px;
            height: 48px;
            font-size: 20px;
            flex-shrink: 0;
          }

          .agent-info h3 {
            font-size: 16px;
            margin-bottom: 4px;
            line-height: 1.2;
          }

          .agent-role {
            font-size: 13px;
            line-height: 1.2;
          }

          .agent-controls {
            margin-left: auto;
          }

          .control-btn {
            width: 28px;
            height: 28px;
            font-size: 12px;
          }

          .priority-badge {
            font-size: 9px;
            padding: 2px 6px;
          }

          .agent-status {
            padding: 6px 10px;
            font-size: 12px;
            border-radius: 16px;
            margin-bottom: 12px;
          }

          .workload-indicator {
            margin-left: auto;
          }

          .workload-bar {
            width: 35px;
            height: 3px;
          }

          .workload-text {
            font-size: 10px;
          }

          .agent-task {
            font-size: 13px;
            line-height: 1.4;
            margin-bottom: 16px;
            min-height: 36px;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .agent-metrics {
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            margin-bottom: 12px;
          }

          .metric {
            text-align: center;
            padding: 8px 4px;
            background: rgba(59, 130, 246, 0.05);
            border-radius: 6px;
          }

          .metric-value {
            font-size: 14px;
            margin-bottom: 2px;
            font-weight: 700;
          }

          .metric-label {
            font-size: 9px;
            letter-spacing: 0.3px;
          }

          .agent-footer {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
            font-size: 11px;
            padding-top: 8px;
          }

          .performance-stats {
            gap: 8px;
            width: 100%;
            justify-content: space-between;
            flex-wrap: wrap;
          }

          .performance-stats span {
            font-size: 10px;
          }

          .learning-progress {
            width: 100%;
            justify-content: space-between;
            align-items: center;
          }

          .learning-progress span {
            font-size: 10px;
          }

          .learning-bar {
            width: 60px;
            height: 3px;
          }

          /* Simplify AI elements for mobile */
          .ai-action-alert,
          .ai-optimization-alert,
          .ai-suggestion-alert {
            display: none;
          }

          .smart-routing-badge,
          .ai-optimization-badge {
            top: -6px;
            right: -6px;
            padding: 3px 6px;
            font-size: 9px;
            border-radius: 8px;
          }

          .ai-activity-indicator {
            top: -1px;
            right: -1px;
            width: 10px;
            height: 10px;
          }

          .ai-pulse {
            width: 4px;
            height: 4px;
          }

          .ai-enhanced-badge {
            font-size: 8px;
            padding: 1px 4px;
          }

          /* Mobile touch improvements */
          .agent-card:active {
            transform: scale(0.98);
          }
        }

        @media (max-width: 480px) {
          .agent-card {
            padding: 20px;
            min-height: 520px;
            border-radius: 18px;
          }

          .agent-avatar {
            width: 64px;
            height: 64px;
            font-size: 28px;
            border-radius: 16px;
          }

          .agent-info h3 {
            font-size: 20px;
          }

          .agent-role {
            font-size: 15px;
          }

          .control-btn {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

          .agent-status {
            padding: 14px 18px;
            font-size: 15px;
          }

          .agent-task {
            font-size: 15px;
            min-height: 90px;
            padding: 18px;
            line-height: 1.6;
          }

          .metric-value {
            font-size: 18px;
          }

          .metric-label {
            font-size: 10px;
          }

          .performance-stats span {
            font-size: 11px;
          }

          .learning-progress span {
            font-size: 11px;
          }

          .learning-bar {
            width: 80px;
          }

          .workload-indicator {
            padding: 10px 14px;
          }

          .workload-text {
            font-size: 13px;
          }

          .workload-bar {
            width: 50px;
            height: 6px;
          }
        }

        @media (max-width: 375px) {
          .agent-card {
            padding: 18px;
            min-height: 500px;
          }

          .agent-avatar {
            width: 56px;
            height: 56px;
            font-size: 24px;
          }

          .agent-info h3 {
            font-size: 18px;
          }

          .agent-role {
            font-size: 14px;
          }

          .agent-status {
            padding: 12px 16px;
            font-size: 14px;
          }

          .agent-task {
            font-size: 14px;
            min-height: 85px;
            padding: 16px;
          }

          .metric {
            padding: 12px 8px;
          }

          .metric-value {
            font-size: 16px;
          }

          .performance-stats {
            padding: 12px;
          }

          .learning-progress {
            padding: 12px;
          }
        }

        /* Universal Mobile Modal Optimizations */
        @media (max-width: 768px) {
          .modal-overlay {
            padding: 0;
            align-items: stretch;
            justify-content: stretch;
          }

          .modal-content {
            width: 100vw;
            height: 100vh;
            max-width: 100vw;
            max-height: 100vh;
            border-radius: 0;
            margin: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          /* Specific modal content optimizations */
          .modal-content.ai-hub-modal,
          .modal-content.analytics-modal,
          .modal-content.voice-modal,
          .modal-content.search-modal,
          .modal-content.iot-modal,
          .modal-content.workflow-modal,
          .modal-content.collaborate-modal,
          .modal-content.quick-export-modal,
          .modal-content.share-modal,
          .modal-content.budget-modal,
          .modal-content.tasks-modal,
          .modal-content.smart-routing-modal {
            width: 100vw;
            height: 100vh;
            max-width: 100vw;
            max-height: 100vh;
            border-radius: 0;
            margin: 0;
          }

          .modal-header {
            padding: 12px 16px;
            border-bottom: 1px solid #e5e7eb;
            flex-shrink: 0;
            background: #ffffff;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          .modal-header h2 {
            font-size: 16px;
            margin: 0;
            flex: 1;
            font-weight: 600;
          }

          .modal-header button {
            width: 32px;
            height: 32px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            background: #f8f9fa;
            border: 1px solid #e5e7eb;
            border-radius: 6px;
            color: #666666;
          }

          .modal-header button:hover {
            background: #e5e7eb;
            color: #1a1a1a;
          }

          .modal-body {
            flex: 1;
            overflow-y: auto;
            padding: 12px 16px;
            background: #ffffff;
          }

          .modal-footer {
            padding: 12px 16px;
            border-top: 1px solid #e5e7eb;
            background: #f8f9fa;
            flex-shrink: 0;
            display: flex;
            gap: 8px;
          }

          .modal-footer button {
            flex: 1;
            padding: 10px 16px;
            font-size: 14px;
            border-radius: 8px;
            font-weight: 600;
          }
        }

        /* Code View Responsive */
        .code-view {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        @media (max-width: 768px) {
          .code-toolbar {
            padding: 8px 12px;
            flex-direction: column;
            gap: 8px;
            align-items: stretch;
          }

          .code-agent-tabs {
            overflow-x: auto;
            padding-bottom: 4px;
          }

          .code-agent-tab {
            min-width: 80px;
            padding: 6px 8px;
            font-size: 11px;
          }

          .code-controls {
            justify-content: center;
            flex-wrap: wrap;
          }

          .control-button {
            padding: 4px 8px;
            font-size: 11px;
          }

          .code-content-container {
            flex-direction: column;
          }

          .code-sidebar {
            width: 100%;
            max-height: 200px;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
          }

          .code-right-panel {
            width: 100%;
            max-height: 150px;
            border-left: none;
            border-top: 1px solid #e5e7eb;
          }
        }

        /* Timeline View Responsive */
        .timeline-view {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        @media (max-width: 768px) {
          .timeline-toolbar {
            padding: 12px;
            flex-direction: column;
            gap: 12px;
          }

          .timeline-controls {
            flex-wrap: wrap;
            justify-content: center;
          }

          .timeline-btn {
            padding: 6px 12px;
            font-size: 12px;
          }

          .timeline-filters {
            flex-wrap: wrap;
            justify-content: center;
          }

          .timeline-select {
            font-size: 12px;
            padding: 4px 8px;
          }

          .gantt-container {
            overflow-x: auto;
          }

          .gantt-header {
            min-width: 600px;
          }

          .gantt-body {
            min-width: 600px;
          }

          .task-column {
            min-width: 200px;
          }

          .milestones-container {
            padding: 16px;
          }

          .milestone {
            flex-direction: column;
            gap: 12px;
            align-items: center;
            text-align: center;
          }

          .milestone-marker {
            width: 40px;
            height: 40px;
          }

          .risks-container {
            padding: 16px;
          }

          .risk-summary {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }

        /* AI Insights Section Redesign - Black & White Theme */
        .ai-insights-section-redesign {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          border: 1px solid #333333;
          border-radius: 16px;
          padding: 24px;
          margin-bottom: 24px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
        }

        .ai-insights-section-redesign::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #ffffff, #f0f0f0, #e0e0e0);
        }

        .insights-header-redesign {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #333333;
        }

        .insights-title-container h3 {
          font-size: 20px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 8px 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .insights-stats-mini {
          display: flex;
          gap: 8px;
        }

        .stat-pill {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 12px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .stat-pill.priority {
          background: rgba(255, 0, 0, 0.2);
          color: #ff6b6b;
          border-color: rgba(255, 0, 0, 0.3);
          animation: pulse 2s infinite;
        }

        .insights-controls {
          display: flex;
          gap: 8px;
        }

        .insights-filter-btn,
        .insights-refresh-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: 1px solid #333333;
          background: #1a1a1a;
          color: #ffffff;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .insights-filter-btn:hover,
        .insights-refresh-btn:hover {
          background: #2a2a2a;
          border-color: #444444;
          transform: translateY(-1px);
        }

        .filter-icon,
        .refresh-icon {
          font-size: 14px;
        }

        .insights-content-redesign {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Priority Section */
        .insights-priority-section {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          position: relative;
        }

        .insights-priority-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          border-radius: 12px 12px 0 0;
        }

        .priority-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .priority-indicator.high-priority {
          font-size: 20px;
          animation: bounce 2s infinite;
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-3px); }
          60% { transform: translateY(-1px); }
        }

        .priority-label {
          font-size: 16px;
          font-weight: 700;
          color: #ffffff;
          flex: 1;
        }

        .priority-count {
          background: #ffffff;
          color: #000000;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
        }

        .priority-insights {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .insight-card-redesign.priority-card {
          background: #000000;
          border: 2px solid #333333;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .insight-card-redesign.priority-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #ffffff, #cccccc);
        }

        .insight-card-redesign.priority-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 48px rgba(0, 0, 0, 0.7);
          border-color: rgba(255, 255, 255, 0.3);
        }

        .insight-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .insight-type-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .type-icon {
          font-size: 14px;
        }

        .insight-urgency {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .urgency-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        .urgency-dot.high {
          background: #ffffff;
        }

        .urgency-text {
          font-size: 10px;
          font-weight: 700;
          color: #cccccc;
          letter-spacing: 0.5px;
        }

        .insight-content-redesign {
          margin-bottom: 20px;
        }

        .insight-title-redesign {
          font-size: 18px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .insight-description-redesign {
          font-size: 14px;
          color: #cccccc;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .suggested-action-redesign {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
        }

        .action-icon {
          font-size: 16px;
          color: #ffffff;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .action-text {
          font-size: 13px;
          color: #e0e0e0;
          font-weight: 500;
          line-height: 1.4;
        }

        .insight-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 4px;
        }

        .metric-item {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 8px 12px;
          text-align: center;
        }

        .metric-label {
          display: block;
          font-size: 10px;
          color: #999999;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .metric-value {
          font-size: 13px;
          font-weight: 700;
          color: #ffffff;
        }

        .insight-actions-redesign {
          display: flex;
          gap: 8px;
        }

        .action-btn-primary {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          color: #000000;
          border: none;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn-primary:hover {
          background: linear-gradient(135deg, #e0e0e0, #cccccc);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.3);
        }

        .action-btn-secondary {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #000000;
          color: #ffffff;
          border: 2px solid #333333;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn-secondary:hover {
          border-color: #666666;
          background: #1a1a1a;
          transform: translateY(-1px);
        }

        .btn-icon {
          font-size: 14px;
        }

        /* Standard Section */
        .insights-standard-section {
          background: #1a1a1a;
          border: 1px solid #333333;
          border-radius: 12px;
          padding: 20px;
        }

        .standard-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 12px;
          border-bottom: 1px solid #333333;
        }

        .standard-indicator {
          font-size: 18px;
          color: #ffffff;
        }

        .standard-label {
          font-size: 16px;
          font-weight: 600;
          color: #ffffff;
          flex: 1;
        }

        .standard-count {
          background: #666666;
          color: #ffffff;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
        }

        .standard-insights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .insight-card-compact {
          background: #000000;
          border: 1px solid #333333;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .insight-card-compact::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background: linear-gradient(135deg, #ffffff, #cccccc);
        }

        .insight-card-compact:hover {
          background: #1a1a1a;
          border-color: #555555;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
        }

        .compact-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 8px;
          gap: 8px;
        }

        .compact-type {
          display: flex;
          align-items: center;
          gap: 6px;
          flex: 1;
        }

        .compact-icon {
          font-size: 14px;
          color: #cccccc;
        }

        .compact-title {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.3;
        }

        .compact-impact {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .compact-impact.medium {
          background: rgba(255, 255, 255, 0.1);
          color: #cccccc;
        }

        .compact-impact.low {
          background: rgba(255, 255, 255, 0.05);
          color: #999999;
        }

        .compact-description {
          font-size: 12px;
          color: #cccccc;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .compact-actions {
          display: flex;
          gap: 6px;
        }

        .compact-action-btn {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #1a1a1a;
          border: 1px solid #333333;
          color: #ffffff;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          flex: 1;
          justify-content: center;
        }

        .compact-action-btn:hover {
          background: #2a2a2a;
          border-color: #555555;
        }

        .compact-action-btn.primary {
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          color: #000000;
          border-color: #ffffff;
        }

        .compact-action-btn.primary:hover {
          background: linear-gradient(135deg, #e0e0e0, #cccccc);
        }

        .compact-btn-icon {
          font-size: 12px;
        }

        /* Summary Bar */
        .insights-summary-bar {
          background: linear-gradient(135deg, #000000, #1a1a1a);
          border: 1px solid #333333;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .insights-summary-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
          pointer-events: none;
        }

        .summary-stats {
          display: flex;
          gap: 24px;
          position: relative;
          z-index: 1;
        }

        .summary-stat {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .summary-icon {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: #ffffff;
        }

        .summary-details {
          display: flex;
          flex-direction: column;
        }

        .summary-value {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 2px;
          color: #ffffff;
        }

        .summary-label {
          font-size: 12px;
          opacity: 0.8;
          font-weight: 500;
          color: #cccccc;
        }

        .view-all-insights-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          z-index: 1;
        }

        .view-all-insights-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
        }

        .view-all-icon {
          font-size: 16px;
        }

        /* Mobile Responsive Design */
        @media (max-width: 768px) {
          .ai-insights-section-redesign {
            padding: 16px;
            margin-bottom: 16px;
            border-radius: 12px;
          }

          .insights-header-redesign {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .insights-title-container h3 {
            font-size: 18px;
          }

          .insights-stats-mini {
            order: 1;
          }

          .insights-controls {
            order: 2;
            width: 100%;
            justify-content: space-between;
          }

          .insights-filter-btn,
          .insights-refresh-btn {
            flex: 1;
            justify-content: center;
          }

          .insights-priority-section {
            padding: 16px;
          }

          .priority-header {
            flex-wrap: wrap;
            gap: 8px;
          }

          .priority-label {
            font-size: 14px;
            flex: none;
            width: 100%;
            order: 1;
          }

          .priority-indicator.high-priority {
            font-size: 18px;
            order: 2;
          }

          .priority-count {
            order: 3;
            width: 20px;
            height: 20px;
            font-size: 11px;
          }

          .insight-card-redesign.priority-card {
            padding: 16px;
          }

          .insight-title-redesign {
            font-size: 16px;
          }

          .insight-description-redesign {
            font-size: 13px;
          }

          .insight-metrics {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .insight-actions-redesign {
            flex-direction: column;
          }

          .action-btn-primary,
          .action-btn-secondary {
            flex: none;
          }

          .standard-insights-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .insight-card-compact {
            padding: 12px;
          }

          .compact-title {
            font-size: 12px;
          }

          .compact-description {
            font-size: 11px;
          }

          .insights-summary-bar {
            flex-direction: column;
            gap: 16px;
            padding: 16px;
            text-align: center;
          }

          .summary-stats {
            flex-direction: column;
            gap: 16px;
            width: 100%;
          }

          .summary-stat {
            justify-content: center;
          }

          .view-all-insights-btn {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .ai-insights-section-redesign {
            padding: 12px;
          }

          .insights-title-container h3 {
            font-size: 16px;
          }

          .stat-pill {
            font-size: 11px;
            padding: 3px 10px;
          }

          .insights-filter-btn,
          .insights-refresh-btn {
            padding: 6px 12px;
            font-size: 12px;
          }

          .insights-priority-section {
            padding: 12px;
          }

          .insight-card-redesign.priority-card {
            padding: 12px;
          }

          .insight-title-redesign {
            font-size: 14px;
          }

          .insight-description-redesign {
            font-size: 12px;
          }

          .suggested-action-redesign {
            padding: 10px;
          }

          .action-text {
            font-size: 12px;
          }

          .action-btn-primary,
          .action-btn-secondary {
            padding: 10px 12px;
            font-size: 12px;
          }

          .insight-card-compact {
            padding: 10px;
          }

          .compact-title {
            font-size: 11px;
          }

          .compact-description {
            font-size: 10px;
          }

          .compact-action-btn {
            padding: 5px 8px;
            font-size: 10px;
          }

          .insights-summary-bar {
            padding: 12px;
          }

          .summary-icon {
            width: 32px;
            height: 32px;
            font-size: 14px;
          }

          .summary-value {
            font-size: 16px;
          }

          .summary-label {
            font-size: 11px;
          }

          .view-all-insights-btn {
            padding: 10px 16px;
            font-size: 12px;
          }
        }
        .ai-hub-btn {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6) !important;
          border: none !important;
        }

        .ai-status-global {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          padding: 4px 8px;
          border-radius: 12px;
        }

        .ai-status-indicator.enhanced {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          padding: 4px 8px;
          border-radius: 12px;
        }

        .ai-status-dot.pulsing {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .voice-quick-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .voice-quick-btn:hover {
          background: #e5e7eb;
        }

        .cards-controls.enhanced {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          gap: 16px;
        }

        @media (max-width: 768px) {
          .cards-controls.enhanced {
            flex-direction: row;
            justify-content: center;
            gap: 16px;
            padding: 16px 20px;
            background: #f8f9fa;
          }

          .filter-section, .sort-section {
            flex: 1;
            min-width: 0;
          }

          .filter-section select, .sort-section select {
            font-size: 14px;
            padding: 10px 14px;
            width: 100%;
            border-radius: 8px;
            border: 1px solid #d1d5db;
            background: #ffffff;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }

          /* Hide AI controls completely on mobile */
          .ai-controls {
            display: none !important;
          }
        }

        .ai-controls {
          display: flex;
          gap: 8px;
        }

        .ai-toggle {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          min-width: 120px;
        }

        .ai-toggle.active {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          border-color: #1a1a1a;
        }

        .toggle-example {
          font-size: 10px;
          opacity: 0.8;
          font-weight: 500;
        }

        .learning-progress {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #666666;
        }

        .learning-bar {
          width: 60px;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          overflow: hidden;
        }

        .learning-bar div {
          height: 100%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .overview-card.enhanced {
          text-align: center;
          padding: 16px;
          background: #ffffff;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;
        }

        .overview-card.enhanced::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .overview-value {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .overview-label {
          font-size: 11px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .overview-trend {
          font-size: 10px;
          color: #22c55e;
          font-weight: 600;
        }

        .action-btn-mini {
          background: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 10px;
          text-align: center;
          font-size: 11px;
          color: #1a1a1a;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .action-btn-mini:hover {
          background: #f8f9fa;
        }

        .ai-insights-mini {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .insight-mini {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 11px;
        }

        .insight-mini-icon {
          font-size: 14px;
        }

        .insight-mini-text {
          color: #666666;
          line-height: 1.3;
        }

        .sidebar-section {
          margin-bottom: 24px;
        }

        .sidebar-section h4 {
          font-size: 12px;
          font-weight: 600;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .insights-container-mini {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .insight-item-mini {
          padding: 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 12px;
        }

        .insight-mini-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .impact-badge {
          font-size: 9px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .impact-badge.high {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .impact-badge.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .impact-badge.low {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .insight-mini-title {
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .insight-mini-desc {
          color: #666666;
          line-height: 1.3;
        }

        .phase-item.enhanced {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 8px;
          cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .phase-item.enhanced.completed {
          background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
          border-color: #22c55e;
        }

        .phase-item.enhanced.active {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
          border-color: #3b82f6;
        }

        .phase-marker {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: white;
        }

        .phase-item.completed .phase-marker {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        .phase-item.active .phase-marker {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .phase-item.pending .phase-marker {
          background: #9ca3af;
        }

        .phase-content {
          flex: 1;
        }

        .phase-title {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 2px;
        }

        .phase-subtitle {
          font-size: 12px;
          color: #666666;
        }

        .phase-progress {
          font-size: 11px;
          color: #3b82f6;
          font-weight: 500;
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .quick-action-btn {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .quick-action-btn:hover {
          background: #f8f9fa;
          transform: translateY(-1px);
        }

        .floating-actions {
          position: fixed;
          bottom: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 1000;
        }

        .fab {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fab:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        .fab.main-fab {
          width: 64px;
          height: 64px;
          font-size: 24px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .modal-content.ai-hub-modal {
          max-width: 1000px;
          max-height: 90vh;
        }

        .ai-hub-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .ai-hub-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .ai-feature-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s ease;
        }

        .ai-feature-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          transform: translateY(-2px);
        }

        .feature-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 16px;
        }

        .ai-feature-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .ai-feature-card p {
          font-size: 14px;
          color: #666666;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .feature-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .feature-toggle input[type="checkbox"] {
          width: 16px;
          height: 16px;
        }

        .ai-insights-section h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .insight-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s ease;
        }

        .insight-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .insight-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .insight-icon {
          font-size: 20px;
        }

        .insight-impact {
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .insight-impact.high {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .insight-impact.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .insight-impact.low {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .insight-card h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .insight-card p {
          font-size: 14px;
          color: #666666;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .suggested-action {
          background: rgba(34, 197, 94, 0.1);
          color: #16a34a;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          margin-bottom: 12px;
        }

        .action-btn {
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          font-weight: 500;
        }

        .modal-content.analytics-modal {
          max-width: 1200px;
          max-height: 90vh;
        }

        .analytics-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .analytics-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .analytics-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .analytics-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .forecast-value {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .forecast-value .current {
          font-size: 24px;
          font-weight: 700;
          color: #666666;
        }

        .forecast-value .arrow {
          font-size: 20px;
          color: #3b82f6;
        }

        .forecast-value .projected {
          font-size: 24px;
          font-weight: 700;
          color: #22c55e;
        }

        .confidence {
          font-size: 12px;
          color: #666666;
          margin-bottom: 16px;
        }

        .trend-chart {
          display: flex;
          align-items: end;
          gap: 4px;
          height: 40px;
        }

        .chart-bar {
          flex: 1;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border-radius: 2px;
          min-height: 8px;
        }

        .rate-display {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
        }

        .current-rate {
          font-size: 32px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 18px;
          font-weight: 600;
        }

        .trend.up {
          color: #ef4444;
        }

        .trend.down {
          color: #22c55e;
        }

        .trend.stable {
          color: #f59e0b;
        }

        .rate-impact {
          font-size: 14px;
          color: #666666;
        }

        .cost-breakdown {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .cost-item {
          display: flex;
          justify-content: space-between;
          font-size: 14px;
        }

        .volatility {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
          align-self: flex-start;
        }

        .volatility.high {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .volatility.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .volatility.low {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .market-metrics {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .metric-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .metric-value {
          font-weight: 700;
          color: #1a1a1a;
        }

        .risk-heatmap-section h3 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .heatmap-container {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
        }

        .heatmap-legend {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 500;
        }

        .legend-item::before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 2px;
        }

        .legend-item.low::before {
          background: #22c55e;
        }

        .legend-item.medium::before {
          background: #f59e0b;
        }

        .legend-item.high::before {
          background: #ef4444;
        }

        .heatmap-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .heatmap-cell {
          padding: 16px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          color: white;
          border-radius: 8px;
        }

        .heatmap-cell.low {
          background: #22c55e;
        }

        .heatmap-cell.medium {
          background: #f59e0b;
        }

        .heatmap-cell.high {
          background: #ef4444;
        }

        .modal-content.voice-modal {
          max-width: 600px;
        }

        .voice-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .voice-interface {
          text-align: center;
          margin-bottom: 32px;
        }

        .voice-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .voice-circle.listening {
          animation: voicePulse 1.5s infinite;
        }

        .voice-wave {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 3px solid rgba(59, 130, 246, 0.3);
          animation: voiceWave 2s infinite;
        }

        .voice-icon {
          font-size: 40px;
          color: white;
        }

        @keyframes voicePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes voiceWave {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .voice-status {
          font-size: 16px;
          color: #666666;
          margin-bottom: 20px;
        }

        .voice-btn {
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        }

        .voice-commands h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .command-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .command-item {
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 14px;
          color: #666666;
          border-left: 3px solid #3b82f6;
        }

        .voice-result {
          margin-top: 20px;
          padding: 16px;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 8px;
        }

        .voice-result h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .modal-content.search-modal {
          max-width: 700px;
        }

        .search-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .search-interface {
          display: flex;
          gap: 12px;
          margin-bottom: 32px;
        }

        .smart-search-input {
          flex: 1;
          padding: 12px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }

        .smart-search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .search-btn {
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          font-weight: 500;
        }

        .search-suggestions h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .suggestion-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 32px;
        }

        .suggestion-btn {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          padding: 12px;
          font-size: 12px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }

        .suggestion-btn:hover {
          background: #e5e7eb;
        }

        .search-results h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .result-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .result-item:hover {
          background: #e5e7eb;
        }

        .result-icon {
          font-size: 16px;
        }

        .result-text {
          flex: 1;
          font-size: 14px;
          color: #1a1a1a;
        }

        .result-count {
          font-size: 12px;
          color: #666666;
        }

        .modal-content.iot-modal {
          max-width: 900px;
        }

        .iot-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .iot-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .iot-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          position: relative;
          overflow: hidden;
        }

        .iot-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .iot-card h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .sensor-reading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
          margin-bottom: 8px;
        }

        .reading-value {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
        }

        .reading-label {
          font-size: 12px;
          color: #666666;
        }

        .sensor-status {
          font-size: 12px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
        }

        .sensor-status.active {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .progress-sensors {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .progress-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 12px;
        }

        .progress-bar {
          flex: 1;
          height: 6px;
          background: #e5e7eb;
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar div {
          height: 100%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .camera-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .camera-feed {
          text-align: center;
        }

        .camera-placeholder {
          width: 100%;
          height: 80px;
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-bottom: 8px;
        }

        .camera-feed span {
          font-size: 12px;
          color: #666666;
        }

        .security-status {
          font-size: 12px;
          color: #22c55e;
          font-weight: 500;
        }

        .equipment-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .equipment-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .equipment-icon {
          font-size: 16px;
        }

        .equipment-item span:nth-child(2) {
          flex: 1;
          font-size: 14px;
          color: #1a1a1a;
        }

        .location {
          font-size: 12px;
          color: #666666;
        }

        /* Additional existing styles remain the same */
        .agent-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid #e5e7eb;
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }

        .agent-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .agent-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 25px rgba(0, 0, 0, 0.1);
        }

        .agent-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 16px;
        }

        .agent-avatar {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          font-weight: 600;
          position: relative;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
        }

        .agent-info {
          flex: 1;
        }

        .agent-info h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .agent-role {
          font-size: 14px;
          color: #666666;
          font-weight: 500;
        }

        .agent-controls {
          display: flex;
          gap: 8px;
        }

        .control-btn {
          width: 32px;
          height: 32px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .control-btn:hover {
          background: #e5e7eb;
        }

        .priority-badge {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }

        .priority-badge.high {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .priority-badge.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .priority-badge.low {
          background: rgba(156, 163, 175, 0.1);
          color: #9ca3af;
        }

        .agent-status {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 16px;
          padding: 8px 12px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .agent-status.active {
          background: rgba(52, 168, 83, 0.1);
          color: #22c55e;
        }

        .agent-status.working {
          background: rgba(255, 152, 0, 0.1);
          color: #f59e0b;
        }

        .agent-status.thinking {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .agent-status.idle {
          background: rgba(156, 163, 175, 0.1);
          color: #9ca3af;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: currentColor;
        }

        .workload-indicator {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .workload-bar {
          width: 40px;
          height: 4px;
          background: #e5e7eb;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
        }

        .workload-text {
          font-size: 11px;
          font-weight: 600;
        }

        .agent-task {
          font-size: 14px;
          color: #1a1a1a;
          line-height: 1.5;
          margin-bottom: 20px;
          min-height: 42px;
        }

        .agent-metrics {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 16px;
        }

        .metric {
          text-align: center;
          flex: 1;
        }

        .metric-value {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 11px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }

        .agent-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-size: 12px;
          color: #666666;
          flex-wrap: wrap;
          gap: 8px;
        }

        .performance-stats {
          display: flex;
          gap: 12px;
        }

        .filter-section, .sort-section {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-section label, .sort-section label {
          font-size: 12px;
          font-weight: 600;
          color: #666666;
        }

        .filter-section select, .sort-section select {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 12px;
          background: #ffffff;
          cursor: pointer;
        }

        .primary-button {
          background: linear-gradient(135deg, #ffffff, #e0e0e0);
          color: #000000;
          border: 1px solid #cccccc;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .primary-button:hover {
          background: linear-gradient(135deg, #e0e0e0, #cccccc);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        .secondary-button {
          background: #1a1a1a;
          color: #ffffff;
          border: 1px solid #333333;
          border-radius: 8px;
          padding: 8px 16px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .secondary-button:hover {
          background: #333333;
          border-color: #666666;
        }

        /* Enhanced Code View Styles */
        .ai-code-insights {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .ai-code-insights h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 12px 0;
        }

        .code-insight-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          margin-bottom: 6px;
          font-size: 12px;
        }

        .insight-icon {
          font-size: 14px;
        }

        .test-performance {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .test-performance h5 {
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .perf-metric {
          font-size: 11px;
          color: #666666;
          margin-bottom: 4px;
        }

        .optimization-suggestions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .opt-suggestion {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 12px;
        }

        .opt-icon {
          font-size: 14px;
        }

        .apply-btn {
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          cursor: pointer;
          margin-left: auto;
        }

        /* Enhanced Timeline View Styles */
        .task-ai-insights {
          font-size: 11px;
          color: #3b82f6;
          font-style: italic;
        }

        .task-ai-marker {
          position: absolute;
          right: -15px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 12px;
        }

        .gantt-insights {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e5e7eb;
        }

        .insight-panel {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .insight-panel h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .timeline-insight {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
          font-size: 13px;
          color: #666666;
        }

        .milestone-ai-suggestion {
          font-size: 11px;
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          margin-top: 8px;
          display: inline-block;
        }

        .milestone-ai-panel {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
        }

        .milestone-ai-panel h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .milestone-metrics {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .metric-card {
          text-align: center;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .metric-card .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .metric-card .metric-label {
          font-size: 12px;
          color: #666666;
        }

        .ai-confidence {
          font-size: 11px;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          margin-top: 4px;
          display: inline-block;
        }

        .predictive-risk-analysis {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-top: 20px;
        }

        .predictive-risk-analysis h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .prediction-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .prediction-card {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .prediction-card h5 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .prediction-timeline {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .prediction-bar {
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 11px;
          font-weight: 600;
        }

        .volatility-chart {
          display: flex;
          gap: 8px;
        }

        .vol-indicator {
          flex: 1;
          padding: 8px;
          text-align: center;
          border-radius: 4px;
          font-size: 12px;
          font-weight: 600;
          background: #f8f9fa;
          color: #666666;
        }

        .vol-indicator.active {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
        }

        /* Enhanced Template Library */
        .template-ai-features {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }

        .ai-feature {
          font-size: 10px;
          padding: 4px 8px;
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
          border-radius: 4px;
          font-weight: 500;
        }

        /* Modal Enhancements */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(4px);
        }

        .modal-content {
          background: white;
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          max-height: 80vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .modal-content.large {
          max-width: 900px;
        }

        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
        }

        .modal-header h2 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .modal-header button {
          width: 32px;
          height: 32px;
          border: none;
          background: #f8f9fa;
          border-radius: 6px;
          cursor: pointer;
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .modal-header button:hover {
          background: #e5e7eb;
        }

        .modal-tabs {
          display: flex;
          border-bottom: 1px solid #e5e7eb;
          background: #f8f9fa;
        }

        .tab {
          padding: 12px 20px;
          font-size: 14px;
          color: #666666;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s ease;
          background: transparent;
          border: none;
        }

        .tab:hover {
          background: #f1f3f4;
        }

        .tab.active {
          color: #1a1a1a;
          border-bottom-color: #3b82f6;
          background: #ffffff;
        }

        .modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .detail-section {
          margin-bottom: 24px;
        }

        .detail-section h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #1a1a1a;
        }

        .status-details {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
        }

        .workload-detail {
          flex: 1;
          font-size: 14px;
        }

        .workload-bar-large {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-top: 4px;
        }

        .workload-bar-large div {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .performance-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .perf-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 0;
          border-bottom: 1px solid #f0f0f0;
        }

        .activity-time {
          font-size: 12px;
          color: #9ca3af;
          min-width: 60px;
        }

        .modal-footer {
          display: flex;
          gap: 12px;
          padding: 20px 24px;
          border-top: 1px solid #e5e7eb;
          background: #f8f9fa;
        }

        .btn-primary {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .btn-secondary {
          background: #f8f9fa;
          color: #1a1a1a;
          border: 1px solid #e5e7eb;
          padding: 10px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        /* Core Code View Styles */
        .code-view {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .code-view.fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: #ffffff;
        }

        .code-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e7eb;
        }

        .code-agent-tabs {
          display: flex;
          gap: 4px;
          overflow-x: auto;
        }

        .code-agent-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 12px;
          font-weight: 500;
          color: #666666;
          background: transparent;
          border: none;
          white-space: nowrap;
          min-width: 100px;
          position: relative;
        }

        .code-agent-tab:hover {
          background: #f1f3f4;
          color: #1a1a1a;
        }

        .code-agent-tab.active {
          background: #ffffff;
          color: #1a1a1a;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .code-agent-tab-avatar {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: 600;
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
        }

        .agent-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          position: absolute;
          top: 4px;
          right: 4px;
        }

        .agent-status-dot.active { background: #22c55e; }
        .agent-status-dot.working { background: #f59e0b; }
        .agent-status-dot.thinking { background: #6b7280; }
        .agent-status-dot.idle { background: #9ca3af; }

        .code-controls {
          display: flex;
          gap: 8px;
        }

        .control-button {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .control-button:hover {
          background: #f8f9fa;
        }

        .control-button.active {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          border-color: #1a1a1a;
        }

        .code-content-container {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        .code-editor-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .code-sidebar {
          width: 220px;
          background: #f8f9fa;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .code-right-panel {
          width: 240px;
          background: #f8f9fa;
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        @media (max-width: 768px) {
          .code-right-panel {
            display: none !important;
          }
        }

        .code-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .code-section-header h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
        }

        .add-file-btn {
          width: 24px;
          height: 24px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-tree {
          padding: 8px;
        }

        .file-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 13px;
          color: #666666;
          transition: all 0.2s ease;
        }

        .file-item:hover {
          background: #f1f3f4;
          color: #1a1a1a;
        }

        .file-item.active {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
        }

        .version-control {
          padding: 16px;
          border-top: 1px solid #e5e7eb;
        }

        .version-control h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 12px 0;
        }

        .git-status {
          margin-bottom: 12px;
        }

        .git-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #666666;
          margin-bottom: 4px;
        }

        .git-icon {
          font-size: 10px;
        }

        .commit-btn {
          width: 100%;
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          border: none;
          padding: 8px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .commit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .code-editor-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .editor-tabs {
          display: flex;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e7eb;
        }

        .editor-tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          font-size: 13px;
          color: #666666;
          cursor: pointer;
          border-right: 1px solid #e5e7eb;
          background: #f8f9fa;
          transition: all 0.2s ease;
        }

        .editor-tab.active {
          background: #ffffff;
          color: #1a1a1a;
        }

        .close-tab {
          background: none;
          border: none;
          color: #666666;
          cursor: pointer;
          font-size: 14px;
          padding: 0;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 2px;
        }

        .close-tab:hover {
          background: #e5e7eb;
        }

        .code-editor-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .code-editor {
          flex: 1;
          display: flex;
          background: #1e1e1e;
          color: #d4d4d4;
          font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
          font-size: 11px;
          line-height: 1.4;
          overflow: hidden;
        }

        .line-numbers {
          padding: 16px 10px;
          background: #252526;
          border-right: 1px solid #333;
          user-select: none;
          min-width: 50px;
          flex-shrink: 0;
        }

        .line-number {
          color: #858585;
          text-align: right;
          font-size: 10px;
          height: 15.4px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .code-content {
          flex: 1;
          padding: 16px;
          overflow: auto;
          max-height: 100%;
        }

        .code-line {
          min-height: 15.4px;
          display: flex;
          align-items: center;
          margin-bottom: 0;
        }

        .indent {
          color: #d4d4d4;
        }

        .keyword { color: #569cd6; font-weight: 500; }
        .string { color: #ce9178; }
        .comment { color: #6a9955; font-style: italic; }
        .number { color: #b5cea8; }
        .function { color: #dcdcaa; }
        .class { color: #4ec9b0; }
        .variable { color: #9cdcfe; }
        .type { color: #4ec9b0; }
        .property { color: #9cdcfe; }
        .module { color: #4ec9b0; }
        .value { color: #569cd6; }

        .test-panel {
          background: #f8f9fa;
          border-top: 1px solid #e5e7eb;
          padding: 16px;
        }

        .test-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .test-header h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0;
        }

        .run-test-btn {
          background: #22c55e;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .run-test-btn:hover {
          background: #16a34a;
        }

        .test-results {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .test-item {
          font-size: 12px;
          padding: 4px 0;
        }

        .test-item.success { color: #22c55e; }
        .test-item.warning { color: #f59e0b; }
        .test-item.error { color: #ef4444; }

        .code-right-panel {
          width: 240px;
          background: #f8f9fa;
          border-left: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
        }

        .panel-section {
          padding: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .panel-section h4 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 12px 0;
        }

        .debug-controls {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .debug-btn {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }

        .debug-btn:hover {
          background: #f8f9fa;
        }

        .perf-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .perf-metric {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 12px;
        }

        .integration-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .integration-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 12px;
        }

        /* Core Timeline View Styles */
        .timeline-view {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #ffffff;
        }

        .timeline-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 24px;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e7eb;
        }

        .timeline-controls {
          display: flex;
          gap: 8px;
        }

        .timeline-btn {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          background: #ffffff;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .timeline-btn:hover {
          background: #f8f9fa;
        }

        .timeline-btn.active {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          border-color: #1a1a1a;
        }

        .timeline-filters {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .timeline-select {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
          background: #ffffff;
          cursor: pointer;
        }

        .export-btn {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .export-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .gantt-container {
          flex: 1;
          overflow: auto;
          background: #ffffff;
        }

        .gantt-header {
          display: flex;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e7eb;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .task-column {
          width: 300px;
          padding: 16px;
          font-size: 14px;
          font-weight: 600;
          border-right: 1px solid #e5e7eb;
        }

        .timeline-months {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .month {
          flex: 1;
          padding: 16px;
          text-align: center;
          font-size: 14px;
          font-weight: 600;
          border-right: 1px solid #e5e7eb;
        }

        .gantt-body {
          display: flex;
          flex-direction: column;
        }

        .gantt-row {
          display: flex;
          border-bottom: 1px solid #f0f0f0;
          min-height: 80px;
        }

        .task-info {
          width: 300px;
          padding: 16px;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .task-name {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .critical-indicator {
          font-size: 12px;
        }

        .task-assignee {
          font-size: 12px;
          color: #666666;
          margin-bottom: 4px;
        }

        .timeline-track {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          padding: 8px;
        }

        .task-bar {
          height: 24px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          padding: 0 8px;
          position: relative;
          min-width: 60px;
        }

        .task-bar.permit { background: linear-gradient(135deg, #3b82f6, #2563eb); }
        .task-bar.planning { background: linear-gradient(135deg, #10b981, #059669); }
        .task-bar.construction { background: linear-gradient(135deg, #f59e0b, #d97706); }
        .task-bar.inspection { background: linear-gradient(135deg, #8b5cf6, #7c3aed); }

        .task-bar.critical {
          border: 2px solid #ef4444;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }

        .task-progress {
          color: white;
          font-size: 11px;
          font-weight: 600;
        }

        .dependency-line {
          position: absolute;
          right: -20px;
          top: 50%;
          width: 20px;
          height: 2px;
          background: #9ca3af;
        }

        .milestones-container {
          flex: 1;
          padding: 32px;
          overflow-y: auto;
        }

        .milestone-timeline {
          max-width: 800px;
          margin: 0 auto 32px;
        }

        .milestone {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 40px;
          position: relative;
        }

        .milestone-marker {
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          position: relative;
        }

        .milestone.completed .milestone-marker {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        .milestone.active .milestone-marker {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .milestone.pending .milestone-marker {
          background: #9ca3af;
        }

        .milestone-number {
          color: white;
          font-size: 18px;
          font-weight: 700;
        }

        .milestone-content {
          flex: 1;
          padding-top: 8px;
        }

        .milestone-content h4 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .milestone-content p {
          font-size: 14px;
          color: #666666;
          margin-bottom: 8px;
        }

        .milestone-dates {
          font-size: 12px;
          color: #9ca3af;
          margin-bottom: 4px;
        }

        .milestone-agent {
          font-size: 12px;
          color: #1a1a1a;
          font-weight: 500;
        }

        .milestone-connector {
          position: absolute;
          left: 24px;
          top: 50px;
          width: 2px;
          height: 40px;
          background: #e5e7eb;
          z-index: 1;
        }

        .risks-container {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
        }

        .risk-dashboard {
          max-width: 1000px;
          margin: 0 auto;
        }

        .risk-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .risk-card {
          padding: 24px;
          border-radius: 12px;
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .risk-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.6s;
        }

        .risk-card:hover::before {
          animation: shimmer 1.5s ease-in-out;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .risk-card.high-risk {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .risk-card.medium-risk {
          background: linear-gradient(135deg, #f59e0b, #d97706);
        }

        .risk-card.low-risk {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        .risk-card h3 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 8px;
          opacity: 0.9;
        }

        .risk-count {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .risk-card p {
          font-size: 12px;
          opacity: 0.8;
          margin: 0;
        }

        .risk-timeline {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .risk-timeline h4 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .risk-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .risk-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          background: #f8f9fa;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .risk-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
        }

        .risk-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .risk-icon.high {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .risk-icon.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .risk-details {
          flex: 1;
        }

        .risk-details h5 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .risk-details p {
          font-size: 14px;
          color: #666666;
          margin-bottom: 8px;
        }

        .mitigation {
          font-size: 13px;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          padding: 4px 8px;
          border-radius: 4px;
          display: inline-block;
          margin-bottom: 4px;
        }

        .risk-probability {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          flex-shrink: 0;
        }

        /* Template Library Styles */
        .template-container {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .template-categories {
          display: flex;
          gap: 8px;
          padding: 16px 24px;
          border-bottom: 1px solid #e5e7eb;
          overflow-x: auto;
        }

        .category-btn {
          padding: 8px 16px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .category-btn:hover {
          background: #e5e7eb;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          border-color: #1a1a1a;
        }

        .template-grid {
          flex: 1;
          padding: 24px;
          overflow-y: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        /* Mobile responsive template library */
        @media (max-width: 768px) {
          .modal-content.large {
            position: fixed;
            top: 10%;
            left: 5%;
            right: 5%;
            bottom: 10%;
            width: 90%;
            height: 80%;
            max-width: 90vw;
            max-height: 80vh;
            border-radius: 12px;
            margin: 0;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            z-index: 1050;
          }

          .template-categories {
            padding: 8px 12px;
            gap: 4px;
            border-bottom: 1px solid #e5e7eb;
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .template-categories::-webkit-scrollbar {
            display: none;
          }

          .category-btn {
            padding: 6px 10px;
            font-size: 11px;
            flex-shrink: 0;
            min-width: 70px;
            text-align: center;
          }

          .template-grid {
            padding: 12px;
            grid-template-columns: 1fr;
            gap: 12px;
            overflow-y: auto;
          }

          .template-card {
            padding: 14px;
            border-radius: 8px;
          }

          .template-header h4 {
            font-size: 14px;
          }

          .template-description {
            font-size: 12px;
            margin-bottom: 12px;
          }

          .template-code-preview {
            font-size: 10px;
            padding: 8px;
            margin-bottom: 12px;
            border-radius: 4px;
          }

          .template-actions {
            gap: 6px;
          }

          .template-actions button {
            padding: 6px 10px;
            font-size: 11px;
          }

          .template-ai-features {
            gap: 4px;
            margin-bottom: 10px;
          }

          .ai-feature {
            font-size: 9px;
            padding: 3px 6px;
          }
        }

        @media (max-width: 480px) {
          .modal-content.large {
            top: 5%;
            left: 2.5%;
            right: 2.5%;
            bottom: 5%;
            width: 95%;
            height: 90%;
            max-width: 95vw;
            max-height: 90vh;
          }

          .template-grid {
            padding: 8px;
            gap: 8px;
          }

          .template-card {
            padding: 12px;
          }

          .template-header h4 {
            font-size: 13px;
          }

          .template-description {
            font-size: 11px;
          }

          .template-code-preview {
            font-size: 9px;
            padding: 6px;
          }
        }

        .template-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .template-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .template-card:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          transform: translateY(-4px);
        }

        .template-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .template-header h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0;
        }

        .template-type {
          background: #f8f9fa;
          color: #666666;
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 500;
        }

        .template-description {
          font-size: 14px;
          color: #666666;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .template-code-preview {
          background: #1e1e1e;
          color: #d4d4d4;
          font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
          font-size: 11px;
          padding: 12px;
          border-radius: 6px;
          margin-bottom: 16px;
          overflow-x: auto;
        }

        .template-actions {
          display: flex;
          gap: 8px;
        }

        .template-actions button {
          flex: 1;
        }

        /* AI Orchestrator Live Activity Styles */
        .ai-status-live {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .live-indicator {
          width: 8px;
          height: 8px;
          background: #ef4444;
          border-radius: 50%;
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.3; }
        }

        .ai-activity-feed {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .ai-activity-feed h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .activity-stream {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
        }

        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 3px solid #e5e7eb;
          transition: all 0.2s ease;
        }

        .activity-item.active {
          border-left-color: #22c55e;
          background: rgba(34, 197, 94, 0.05);
          animation: fadeInGlow 0.5s ease;
        }

        @keyframes fadeInGlow {
          0% { background: rgba(34, 197, 94, 0.2); }
          100% { background: rgba(34, 197, 94, 0.05); }
        }

        .activity-time {
          font-size: 11px;
          color: #9ca3af;
          min-width: 60px;
          font-weight: 500;
        }

        .activity-icon {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
          font-size: 13px;
          line-height: 1.4;
        }

        .activity-result {
          font-size: 12px;
          color: #22c55e;
          font-weight: 600;
          margin-top: 4px;
        }

        /* Enhanced AI Feature Cards */
        .ai-feature-card.smart-routing {
          border-left: 4px solid #3b82f6;
        }

        .ai-feature-card.auto-scaling {
          border-left: 4px solid #10b981;
        }

        .ai-feature-card.learning {
          border-left: 4px solid #8b5cf6;
        }

        .ai-feature-card.conflict-resolution {
          border-left: 4px solid #f59e0b;
        }

        .feature-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin: 12px 0;
        }

        .stat-item {
          text-align: center;
          padding: 8px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a1a;
          display: block;
        }

        .stat-label {
          font-size: 11px;
          color: #666666;
          margin-top: 2px;
        }

        .live-example {
          margin-top: 12px;
          padding: 12px;
          background: rgba(59, 130, 246, 0.05);
          border-radius: 8px;
          border: 1px solid rgba(59, 130, 246, 0.1);
        }

        .routing-example {
          font-size: 12px;
        }

        .task-flow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .task {
          background: #3b82f6;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
        }

        .arrow {
          color: #666666;
          font-weight: bold;
        }

        .agent-from {
          background: #ef4444;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
        }

        .ai-decision {
          background: linear-gradient(135deg, #1a1a1a, #3b82f6);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
        }

        .agent-to {
          background: #22c55e;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
        }

        .outcome {
          font-size: 11px;
          color: #22c55e;
          font-weight: 600;
        }

        .optimization-examples {
          margin-top: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .opt-example {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          padding: 6px 8px;
          background: rgba(16, 185, 129, 0.05);
          border-radius: 4px;
        }

        .opt-type {
          font-weight: 600;
        }

        .opt-result {
          color: #10b981;
          font-weight: 600;
        }

        .learning-network {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin: 12px 0;
        }

        .agent-node {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: 600;
        }

        .knowledge-flow {
          font-size: 16px;
          color: #8b5cf6;
          animation: pulse 2s infinite;
        }

        .learning-stats {
          font-size: 12px;
          color: #666666;
          text-align: center;
          margin-top: 8px;
        }

        .conflict-example {
          margin: 12px 0;
        }

        .conflict-agents {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-bottom: 8px;
        }

        .agent-opinion {
          font-size: 11px;
          padding: 4px 8px;
          background: #f8f9fa;
          border-radius: 4px;
          border-left: 3px solid #f59e0b;
        }

        .vs {
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          margin: 4px 0;
        }

        .ai-solution {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 8px;
          background: rgba(34, 197, 94, 0.1);
          border-radius: 4px;
          font-size: 11px;
          font-weight: 600;
          color: #22c55e;
        }

        .solution-icon {
          font-size: 14px;
        }

        /* Performance Dashboard */
        .orchestrator-dashboard {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .orchestrator-dashboard h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 16px;
        }

        .perf-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .perf-metric-card {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          position: relative;
          overflow: hidden;
        }

        .perf-metric-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
        }

        .metric-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .metric-icon {
          font-size: 16px;
        }

        .metric-title {
          font-size: 12px;
          font-weight: 600;
          color: #666666;
        }

        .perf-metric-card .metric-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .metric-change {
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .metric-change.positive {
          color: #22c55e;
        }

        .metric-change.negative {
          color: #ef4444;
        }

        .metric-chart {
          display: flex;
          align-items: end;
          gap: 2px;
          height: 40px;
        }

        .metric-chart .chart-bar {
          flex: 1;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border-radius: 2px;
          min-height: 8px;
        }

        .accuracy-breakdown,
        .savings-breakdown {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .accuracy-item,
        .savings-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11px;
          color: #666666;
        }

        /* Enhanced Header Indicators */
        .ai-status-global.enhanced {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          padding: 6px 12px;
          border-radius: 12px;
          border: 1px solid rgba(34, 197, 94, 0.2);
        }

        .ai-activity-count {
          background: #22c55e;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 8px;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }

        .smart-routing-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #3b82f6;
          background: rgba(59, 130, 246, 0.1);
          padding: 6px 12px;
          border-radius: 12px;
          border: 1px solid rgba(59, 130, 246, 0.2);
        }

        .routing-icon {
          font-size: 14px;
        }

        .routing-efficiency {
          background: #3b82f6;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 8px;
          font-weight: 600;
        }

        /* Enhanced Sidebar Insights */
        .insight-mini.active {
          background: rgba(34, 197, 94, 0.1);
          border: 1px solid rgba(34, 197, 94, 0.2);
          animation: fadeInGlow 0.5s ease;
        }

        .insight-mini-time {
          font-size: 10px;
          color: #9ca3af;
          margin-top: 4px;
        }

        /* Enhanced Agent Card Styles */
        .agent-card.dragging {
          opacity: 0.7;
          transform: rotate(2deg);
        }

        .smart-routing-badge,
        .ai-optimization-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 4px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          z-index: 10;
        }

        .ai-optimization-badge {
          background: linear-gradient(135deg, #10b981, #22c55e);
        }

        .ai-activity-indicator {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #22c55e;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-pulse {
          width: 6px;
          height: 6px;
          background: white;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        .ai-enhanced-badge {
          font-size: 10px;
          padding: 2px 6px;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: white;
          border-radius: 4px;
          font-weight: 600;
        }

        .ai-action-alert,
        .ai-optimization-alert,
        .ai-suggestion-alert {
          margin: 12px 0;
          padding: 12px;
          border-radius: 8px;
          font-size: 12px;
          border-left: 3px solid;
        }

        .ai-action-alert {
          background: rgba(59, 130, 246, 0.1);
          border-left-color: #3b82f6;
        }

        .ai-optimization-alert {
          background: rgba(16, 185, 129, 0.1);
          border-left-color: #10b981;
        }

        .ai-suggestion-alert {
          background: rgba(245, 158, 11, 0.1);
          border-left-color: #f59e0b;
        }

        .action-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .action-icon {
          font-size: 14px;
        }

        .action-title {
          font-weight: 600;
          color: #1a1a1a;
        }

        .action-details {
          color: #666666;
          margin-bottom: 4px;
          line-height: 1.3;
        }

        .action-result {
          font-weight: 600;
          font-size: 11px;
        }

        .smart-routing-suggestion {
          margin-top: 12px;
          padding: 12px;
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 8px;
          font-size: 12px;
        }

        .suggestion-header {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 6px;
        }

        .suggestion-icon {
          font-size: 14px;
        }

        .suggestion-content {
          color: #666666;
          margin-bottom: 8px;
        }

        .apply-suggestion-btn {
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .apply-suggestion-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        /* Workflow Engine Modal Styles */
        .modal-content.workflow-modal {
          max-width: 1000px;
          max-height: 90vh;
        }

        .workflow-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .workflow-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .stat-card .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .stat-card .stat-label {
          font-size: 12px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .workflow-examples {
          margin-bottom: 24px;
        }

        .workflow-examples h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .workflow-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
        }

        .workflow-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .workflow-icon {
          font-size: 20px;
        }

        .workflow-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          flex: 1;
        }

        .workflow-status {
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .workflow-status.active {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .workflow-status.optimized {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .workflow-status.automated {
          background: rgba(139, 92, 246, 0.1);
          color: #8b5cf6;
        }

        .workflow-steps {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .step {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 14px;
        }

        .step.completed {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .step.active {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .step.pending {
          background: #f8f9fa;
          color: #666666;
        }

        .workflow-ai-optimization {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.2);
          border-radius: 6px;
          padding: 12px;
          font-size: 13px;
          color: #8b5cf6;
        }

        .workflow-triggers h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .trigger-examples {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .trigger-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 14px;
        }

        .trigger-icon {
          font-size: 18px;
          width: 24px;
          text-align: center;
        }

        .trigger-desc {
          flex: 1;
          color: #1a1a1a;
        }

        .trigger-result {
          color: #22c55e;
          font-weight: 600;
        }

        /* Deploy Modal Styles */
        .modal-content.deploy-modal {
          max-width: 800px;
        }

        .deploy-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        /* Mobile responsive deploy modal */
        @media (max-width: 768px) {
          .deploy-content {
            padding: 16px;
          }

          .deploy-details {
            padding: 12px;
          }

          .detail-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
            padding: 8px 0;
          }

          .deployment-actions {
            flex-direction: column;
            gap: 8px;
          }

          .deploy-btn {
            padding: 12px 16px;
            font-size: 14px;
          }

          .target-list {
            gap: 6px;
          }

          .target-item {
            padding: 10px 12px;
            flex-wrap: wrap;
            gap: 8px;
          }

          .target-name {
            font-size: 13px;
          }

          .timeline-steps {
            gap: 6px;
          }

          .timeline-step {
            padding: 8px 10px;
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }

          .step-time {
            min-width: auto;
            font-size: 11px;
          }

          .step-desc {
            font-size: 12px;
          }
        }

        .deploy-overview {
          margin-bottom: 24px;
        }

        .deploy-overview h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .deploy-details {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-label {
          font-weight: 600;
          color: #666666;
        }

        .detail-value {
          color: #1a1a1a;
        }

        .detail-value.success {
          color: #22c55e;
        }

        .detail-value.improvement {
          color: #3b82f6;
        }

        .deployment-targets {
          margin-bottom: 24px;
        }

        .deployment-targets h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .target-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .target-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
        }

        .target-icon {
          font-size: 16px;
          width: 20px;
          text-align: center;
        }

        .target-name {
          flex: 1;
          font-weight: 500;
        }

        .target-status {
          font-size: 12px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .target-status.ready {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .target-status.warning {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .deployment-timeline {
          margin-bottom: 24px;
        }

        .deployment-timeline h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .timeline-steps {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .timeline-step {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .step-time {
          font-weight: 600;
          color: #3b82f6;
          min-width: 50px;
        }

        .step-desc {
          color: #666666;
        }

        .deployment-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .deploy-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .deploy-btn.staging {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
        }

        .deploy-btn.production {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
        }

        .deploy-btn.rollback {
          background: #f8f9fa;
          color: #666666;
          border: 1px solid #e5e7eb;
        }

        .deploy-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .deployment-log h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .log-entries {
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-height: 200px;
          overflow-y: auto;
        }

        .log-entry {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 13px;
        }

        .log-entry.success {
          background: rgba(34, 197, 94, 0.1);
          border-left: 3px solid #22c55e;
        }

        .log-entry.warning {
          background: rgba(245, 158, 11, 0.1);
          border-left: 3px solid #f59e0b;
        }

        .log-time {
          font-weight: 600;
          color: #666666;
          min-width: 70px;
        }

        .log-message {
          color: #1a1a1a;
        }

        /* Code Optimizer Modal Styles */
        .modal-content.optimize-modal {
          max-width: 1000px;
          max-height: 90vh;
        }

        .optimize-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        /* Mobile responsive optimizer modal */
        @media (max-width: 768px) {
          .modal-content.optimize-modal {
            position: fixed;
            top: 5%;
            left: 2.5%;
            right: 2.5%;
            bottom: 5%;
            width: 95%;
            height: 90%;
            max-width: 95vw;
            max-height: 90vh;
            border-radius: 12px;
            margin: 0;
            overflow: hidden;
          }

          .optimize-content {
            padding: 12px;
            overflow-x: hidden;
            width: 100%;
          }

          .analysis-summary {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding-bottom: 8px;
            width: 100%;
            scrollbar-width: thin;
            scrollbar-color: #d1d5db #f8f9fa;
          }

          .analysis-summary::-webkit-scrollbar {
            height: 4px;
          }

          .analysis-summary::-webkit-scrollbar-track {
            background: #f8f9fa;
            border-radius: 2px;
          }

          .analysis-summary::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 2px;
          }

          .analysis-summary::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }

          .analysis-metric {
            padding: 12px;
            width: 140px;
            min-width: 140px;
            flex-shrink: 0;
            box-sizing: border-box;
            text-align: center;
          }

          .analysis-metric .metric-label {
            font-size: 11px;
            margin-bottom: 6px;
          }

          .analysis-metric .metric-value {
            font-size: 16px;
          }

          .suggestion-list {
            gap: 10px;
            width: 100%;
          }

          .suggestion-item {
            padding: 12px;
            width: 100%;
            box-sizing: border-box;
            overflow: hidden;
          }

          .suggestion-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }

          .suggestion-title {
            font-size: 13px;
            line-height: 1.3;
          }

          .impact-badge {
            align-self: flex-start;
          }

          .suggestion-description {
            font-size: 11px;
            line-height: 1.4;
            margin-bottom: 8px;
          }

          .suggestion-metrics {
            flex-direction: column;
            gap: 4px;
            width: 100%;
          }

          .suggestion-metrics .metric {
            width: 100%;
            box-sizing: border-box;
            font-size: 10px;
            padding: 3px 6px;
          }

          .suggestion-code {
            padding: 8px;
            margin-bottom: 10px;
            overflow-x: auto;
            width: 100%;
            box-sizing: border-box;
          }

          .suggestion-code code {
            font-size: 9px;
            padding: 4px 6px;
            display: block;
            white-space: pre-wrap;
            word-break: break-all;
            overflow-wrap: break-word;
          }

          .code-before,
          .code-after {
            margin-bottom: 6px;
          }

          .code-label {
            font-size: 10px;
            margin-bottom: 2px;
          }

          .apply-optimization-btn {
            padding: 6px 12px;
            font-size: 11px;
            width: 100%;
            box-sizing: border-box;
          }

          .results-comparison {
            gap: 10px;
            width: 100%;
          }

          .comparison-item {
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
          }

          .comparison-label {
            font-size: 12px;
            margin-bottom: 8px;
          }

          .comparison-bars {
            gap: 4px;
            width: 100%;
          }

          .bar-before,
          .bar-after {
            width: 100%;
            min-width: 0;
          }

          .bar-label {
            min-width: 40px;
            font-size: 10px;
          }

          .bar {
            flex: 1;
            min-width: 60px;
            font-size: 9px;
            padding: 2px 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .improvement {
            font-size: 12px;
            margin-top: 6px;
          }

          .optimization-controls {
            flex-direction: column;
            gap: 6px;
            width: 100%;
            padding: 0;
            margin: 0;
          }

          .optimize-all-btn,
          .preview-btn,
          .cancel-btn {
            padding: 10px 12px;
            font-size: 12px;
            width: 100%;
            box-sizing: border-box;
            margin: 0;
          }

          .optimization-analysis h3,
          .optimization-suggestions h3,
          .optimization-results h3 {
            font-size: 14px;
            margin-bottom: 10px;
          }
        }

        .optimization-analysis {
          margin-bottom: 24px;
        }

        .optimization-analysis h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .analysis-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .analysis-metric {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .analysis-metric .metric-label {
          font-size: 12px;
          color: #666666;
          margin-bottom: 8px;
        }

        .analysis-metric .metric-value {
          font-size: 18px;
          font-weight: 700;
        }

        .analysis-metric .metric-value.warning {
          color: #f59e0b;
        }

        .analysis-metric .metric-value.danger {
          color: #ef4444;
        }

        .analysis-metric .metric-value.success {
          color: #22c55e;
        }

        .optimization-suggestions {
          margin-bottom: 24px;
        }

        .optimization-suggestions h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .suggestion-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .suggestion-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          position: relative;
        }

        .suggestion-item.high-impact {
          border-left: 4px solid #22c55e;
        }

        .suggestion-item.medium-impact {
          border-left: 4px solid #f59e0b;
        }

        .suggestion-item.security {
          border-left: 4px solid #ef4444;
        }

        .suggestion-item.low-impact {
          border-left: 4px solid #6b7280;
        }

        .suggestion-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .suggestion-icon {
          font-size: 20px;
        }

        .suggestion-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          flex: 1;
        }

        .impact-badge {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .impact-badge.high {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .impact-badge.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .impact-badge.critical {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .impact-badge.low {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .suggestion-description {
          color: #666666;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .suggestion-metrics {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .suggestion-metrics .metric {
          font-size: 12px;
          color: #666666;
          background: #f8f9fa;
          padding: 4px 8px;
          border-radius: 4px;
        }

        .suggestion-code {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          margin-bottom: 16px;
          font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
        }

        .code-before,
        .code-after {
          margin-bottom: 8px;
        }

        .code-label {
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          display: block;
          margin-bottom: 4px;
        }

        .suggestion-code code {
          background: #1e1e1e;
          color: #d4d4d4;
          padding: 8px 12px;
          border-radius: 4px;
          display: block;
          font-size: 12px;
        }

        .apply-optimization-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .apply-optimization-btn.critical {
          background: linear-gradient(135deg, #ef4444, #dc2626);
        }

        .apply-optimization-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .optimization-results {
          margin-bottom: 24px;
        }

        .optimization-results h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .results-comparison {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .comparison-item {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .comparison-label {
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 12px;
          display: block;
        }

        .comparison-bars {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bar-before,
        .bar-after {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bar-label {
          font-size: 12px;
          color: #666666;
          min-width: 50px;
        }

        .bar {
          height: 20px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 11px;
          font-weight: 600;
          min-width: 60px;
        }

        .improvement {
          font-size: 14px;
          font-weight: 600;
          color: #22c55e;
          margin-top: 8px;
        }

        .optimization-controls {
          display: flex;
          gap: 12px;
        }

        .optimize-all-btn {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          flex: 1;
        }

        .preview-btn {
          background: #f8f9fa;
          color: #1a1a1a;
          border: 1px solid #e5e7eb;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          flex: 1;
        }

        .cancel-btn {
          background: transparent;
          color: #666666;
          border: 1px solid #e5e7eb;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        /* Enhanced Button Styles */
        .workflows-btn {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important;
          color: white !important;
          border: none !important;
        }

        .control-button.ai-optimize {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          border: none;
        }

        .control-button.ai-optimize:hover {
          background: linear-gradient(135deg, #059669, #047857);
        }

        /* Fullscreen Code View Styles */
        .code-view.fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 9999;
          background: #ffffff;
        }

        .fullscreen-btn {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed) !important;
          color: white !important;
          border: none !important;
        }

        .fullscreen-btn:hover {
          background: linear-gradient(135deg, #7c3aed, #6d28d9) !important;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        /* Fullscreen overlay */
        .code-view.fullscreen::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          z-index: -1;
        }

        .code-view.fullscreen .code-toolbar {
          background: #f8f9fa;
          border-bottom: 2px solid #e5e7eb;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .code-view.fullscreen .code-content-container {
          height: calc(100vh - 60px);
        }

        /* Budget Modal Styles */
        .modal-content.budget-modal {
          max-width: 1000px;
          max-height: 90vh;
        }

        .budget-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .budget-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .summary-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .summary-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
        }

        .summary-card.total::before {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
        }

        .summary-card.variance::before {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        .summary-card.forecast::before {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .summary-card h3 {
          font-size: 14px;
          font-weight: 600;
          color: #666666;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .budget-amount,
        .variance-amount,
        .forecast-amount {
          font-size: 28px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .variance-amount.negative {
          color: #22c55e;
        }

        .variance-amount.positive {
          color: #ef4444;
        }

        .budget-status,
        .variance-status,
        .forecast-confidence {
          font-size: 12px;
          color: #666666;
        }

        .budget-breakdown {
          margin-bottom: 32px;
        }

        .budget-breakdown h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .budget-table {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 16px;
          background: #f8f9fa;
          border-bottom: 1px solid #e5e7eb;
          font-weight: 600;
          color: #666666;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          align-items: center;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .category-name {
          font-weight: 600;
          color: #1a1a1a;
        }

        .budgeted,
        .actual {
          font-weight: 600;
          color: #1a1a1a;
        }

        .variance.negative {
          color: #22c55e;
          font-weight: 600;
        }

        .variance.positive {
          color: #ef4444;
          font-weight: 600;
        }

        .status {
          font-size: 12px;
          font-weight: 600;
        }

        .ai-budget-insights h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .insights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 16px;
        }

        .insight-card {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 12px;
        }

        .insight-card.cost-saving {
          border-left: 4px solid #22c55e;
        }

        .insight-card.risk-warning {
          border-left: 4px solid #ef4444;
        }

        .insight-card.forecast {
          border-left: 4px solid #3b82f6;
        }

        .insight-card .insight-icon {
          font-size: 24px;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: #ffffff;
        }

        .insight-content {
          flex: 1;
        }

        .insight-content h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 8px;
        }

        .insight-content p {
          font-size: 13px;
          color: #666666;
          line-height: 1.4;
          margin-bottom: 12px;
        }

        .insight-action {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .insight-action:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        /* Tasks Modal Styles */
        .modal-content.tasks-modal {
          max-width: 1200px;
          max-height: 90vh;
        }

        .tasks-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .tasks-overview {
          margin-bottom: 24px;
        }

        .task-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-bottom: 20px;
        }

        .task-stats .stat-card {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .stat-label {
          font-size: 12px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .task-filters {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
          background: #ffffff;
          cursor: pointer;
        }

        .add-task-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          margin-left: auto;
        }

        .tasks-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .task-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          display: flex;
          gap: 20px;
          transition: all 0.2s ease;
        }

        .task-item:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          transform: translateY(-2px);
        }

        .task-item.high {
          border-left: 4px solid #ef4444;
        }

        .task-item.medium {
          border-left: 4px solid #f59e0b;
        }

        .task-item.low {
          border-left: 4px solid #22c55e;
        }

        .task-main {
          flex: 2;
        }

        .task-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 8px;
        }

        .task-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          flex: 1;
        }

        .task-priority {
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .task-priority.high {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .task-priority.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .task-priority.low {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .task-status {
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .task-status.pending {
          background: rgba(156, 163, 175, 0.1);
          color: #9ca3af;
        }

        .task-status.in-progress {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .task-status.completed {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .task-status.blocked {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .task-description {
          color: #666666;
          line-height: 1.5;
          margin-bottom: 12px;
        }

        .task-meta {
          display: flex;
          gap: 16px;
          font-size: 12px;
          color: #666666;
        }

        .task-progress-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .progress-label {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 8px;
          text-align: center;
        }

        .task-progress-section .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 12px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .task-actions {
          display: flex;
          gap: 8px;
        }

        .task-action {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .task-action:hover {
          background: #e5e7eb;
        }

        .ai-task-insights {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
        }

        .ai-task-insights h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .task-insights-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .task-insight {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          font-size: 13px;
          color: #666666;
        }

        /* Timeline AI Optimize Modal Styles */
        .modal-content.timeline-optimize-modal {
          max-width: 1000px;
          max-height: 90vh;
        }

        .timeline-optimize-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .optimization-overview {
          margin-bottom: 24px;
        }

        .optimization-overview h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .optimization-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .opt-stat {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .opt-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .opt-label {
          font-size: 12px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .optimization-suggestions {
          margin-bottom: 24px;
        }

        .optimization-suggestions h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .opt-suggestions-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .opt-suggestion-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
        }

        .opt-suggestion-item.high {
          border-left: 4px solid #22c55e;
        }

        .opt-suggestion-item.medium {
          border-left: 4px solid #f59e0b;
        }

        .opt-suggestion-item.low {
          border-left: 4px solid #6b7280;
        }

        .suggestion-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .suggestion-icon {
          font-size: 20px;
        }

        .suggestion-title {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          flex: 1;
        }

        .impact {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .impact.high {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .impact.medium {
          background: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .impact.low {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .suggestion-desc {
          color: #666666;
          margin-bottom: 12px;
          line-height: 1.5;
        }

        .suggestion-benefit {
          font-size: 13px;
          color: #22c55e;
          background: rgba(34, 197, 94, 0.1);
          padding: 8px 12px;
          border-radius: 6px;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .apply-suggestion {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .apply-suggestion:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .optimization-impact {
          margin-bottom: 24px;
        }

        .optimization-impact h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .impact-comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 20px;
        }

        .timeline-before,
        .timeline-after {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .timeline-before h4,
        .timeline-after h4 {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
          color: #666666;
        }

        .timeline-bar {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .timeline-phase {
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: white;
          text-align: center;
        }

        .timeline-bar.current .timeline-phase {
          background: linear-gradient(135deg, #6b7280, #4b5563);
        }

        .timeline-bar.optimized .timeline-phase {
          background: linear-gradient(135deg, #22c55e, #16a34a);
        }

        .timeline-total {
          font-size: 14px;
          font-weight: 700;
          color: #1a1a1a;
          text-align: center;
        }

        .optimization-benefits {
          display: flex;
          justify-content: space-around;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .benefit-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #22c55e;
        }

        .benefit-icon {
          font-size: 16px;
        }

        /* Export Modal Styles */
        .modal-content.export-modal {
          max-width: 800px;
          max-height: 90vh;
        }

        .export-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .export-options {
          margin-bottom: 24px;
        }

        .export-options h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .export-formats {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .format-option {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          transition: all 0.2s ease;
        }

        .format-option:hover {
          background: #f1f3f4;
        }

        .format-option input[type="checkbox"] {
          margin-right: 12px;
        }

        .format-option label {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          width: 100%;
        }

        .format-icon {
          font-size: 20px;
          width: 24px;
          text-align: center;
        }

        .format-name {
          font-weight: 600;
          color: #1a1a1a;
          flex: 1;
        }

        .format-desc {
          font-size: 12px;
          color: #666666;
        }

        .export-filters {
          margin-bottom: 24px;
        }

        .export-filters h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .filter-options {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-group label {
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-group select {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
          background: #ffffff;
          cursor: pointer;
        }

        .export-preview {
          margin-bottom: 24px;
        }

        .export-preview h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .preview-content {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .preview-header {
          margin-bottom: 12px;
        }

        .preview-header h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .preview-date {
          font-size: 12px;
          color: #666666;
        }

        .preview-summary {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }

        .summary-item {
          font-size: 13px;
          color: #666666;
          padding: 4px 0;
        }

        .preview-sections {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .section-item {
          font-size: 12px;
          color: #22c55e;
          font-weight: 500;
        }

        .export-actions {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .export-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .export-btn.preview {
          background: #f8f9fa;
          color: #1a1a1a;
          border: 1px solid #e5e7eb;
        }

        .export-btn.generate {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
        }

        .export-btn.schedule {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
        }

        .export-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .export-history h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .history-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .history-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .history-file {
          flex: 1;
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
        }

        .history-date {
          font-size: 11px;
          color: #666666;
        }

        .download-btn {
          background: #22c55e;
          color: white;
          border: none;
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
        }

        /* Smart Routing Modal Styles */
        .modal-content.smart-routing-modal {
          max-width: 1200px;
          max-height: 90vh;
        }

        .routing-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .routing-status .status-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .smart-routing-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .routing-overview {
          margin-bottom: 24px;
        }

        .routing-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .routing-stat {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .routing-stat .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .routing-stat .stat-label {
          font-size: 12px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .live-routing-feed {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .live-routing-feed h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .routing-events {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 300px;
          overflow-y: auto;
        }

        .routing-event {
          display: flex;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
          border-left: 3px solid #3b82f6;
        }

        .event-time {
          font-size: 11px;
          color: #9ca3af;
          min-width: 60px;
          font-weight: 500;
        }

        .event-details {
          flex: 1;
        }

        .event-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .event-icon {
          font-size: 14px;
        }

        .event-type {
          font-weight: 600;
          color: #1a1a1a;
          font-size: 13px;
        }

        .efficiency-badge {
          background: #22c55e;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          margin-left: auto;
        }

        .routing-flow {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 4px;
          font-size: 12px;
        }

        .from-agent {
          background: #ef4444;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
        }

        .routing-arrow {
          color: #3b82f6;
          font-weight: bold;
        }

        .to-agent {
          background: #22c55e;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
        }

        .event-reason {
          font-size: 11px;
          color: #666666;
          margin-bottom: 4px;
        }

        .reason-label {
          font-weight: 600;
        }

        .event-benefit {
          font-size: 11px;
          color: #22c55e;
          font-weight: 600;
        }

        .routing-controls {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .routing-controls h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .control-groups {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }

        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-group label {
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .control-group select {
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
          background: #ffffff;
          cursor: pointer;
        }

        .slider-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .slider-container input[type="range"] {
          width: 100%;
        }

        .slider-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #666666;
        }

        .routing-rules {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .routing-rules h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .rules-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 16px;
        }

        .rule-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .rule-condition {
          font-size: 13px;
          color: #666666;
          flex: 1;
        }

        .rule-action {
          font-size: 13px;
          color: #1a1a1a;
          font-weight: 500;
          flex: 1;
        }

        .rule-status {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .rule-status.active {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .rule-status.paused {
          background: rgba(156, 163, 175, 0.1);
          color: #9ca3af;
        }

        .add-rule-btn {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .routing-analytics {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
        }

        .routing-analytics h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .analytics-chart {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .chart-header span {
          font-weight: 600;
          color: #1a1a1a;
        }

        .chart-header select {
          padding: 4px 8px;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          font-size: 12px;
        }

        .efficiency-chart {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chart-bars {
          display: flex;
          align-items: end;
          gap: 8px;
          height: 120px;
          justify-content: space-between;
        }

        .chart-bars .bar {
          flex: 1;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          border-radius: 4px 4px 0 0;
          display: flex;
          align-items: end;
          justify-content: center;
          color: white;
          font-size: 10px;
          font-weight: 600;
          padding: 4px;
          min-height: 20px;
        }

        .bar-value {
          margin-bottom: 4px;
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #666666;
        }

        /* Collaborate Modal Styles */
        .modal-content.collaborate-modal {
          max-width: 1200px;
          max-height: 90vh;
        }

        .collaboration-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .online-count {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .collaborate-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .collaboration-overview {
          margin-bottom: 24px;
        }

        .collab-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .collab-stat {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .collab-stat .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .collab-stat .stat-label {
          font-size: 12px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .team-members {
          margin-bottom: 24px;
        }

        .members-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .members-header h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0;
        }

        .invite-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .members-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .member-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
        }

        .member-avatar-container {
          position: relative;
        }

        .member-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .status-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid white;
        }

        .status-indicator.online {
          background: #22c55e;
        }

        .status-indicator.away {
          background: #f59e0b;
        }

        .status-indicator.offline {
          background: #9ca3af;
        }

        .member-details {
          flex: 1;
        }

        .member-name {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 2px;
        }

        .member-role {
          font-size: 13px;
          color: #666666;
          margin-bottom: 2px;
        }

        .member-email {
          font-size: 12px;
          color: #9ca3af;
        }

        .member-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .permission-badge {
          font-size: 10px;
          padding: 4px 8px;
          border-radius: 4px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .permission-badge.admin {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        .permission-badge.editor {
          background: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .permission-badge.viewer {
          background: rgba(107, 114, 128, 0.1);
          color: #6b7280;
        }

        .last-active {
          font-size: 11px;
          color: #666666;
        }

        .member-actions {
          display: flex;
          gap: 4px;
        }

        .action-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #e5e7eb;
          background: #f8f9fa;
          border-radius: 4px;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background: #e5e7eb;
        }

        .collaboration-activity {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }

        .collaboration-activity h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .activity-feed {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 200px;
          overflow-y: auto;
        }

        .collaboration-activity .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .activity-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .collaboration-activity .activity-content {
          flex: 1;
          font-size: 13px;
          color: #666666;
        }

        .collaboration-tools {
          margin-bottom: 24px;
        }

        .collaboration-tools h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .tool-card {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          gap: 12px;
        }

        .tool-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
        }

        .tool-content {
          flex: 1;
        }

        .tool-content h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .tool-content p {
          font-size: 12px;
          color: #666666;
          margin-bottom: 12px;
        }

        .tool-action {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
        }

        .collaboration-settings h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .setting-item {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
        }

        .setting-item label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #1a1a1a;
          cursor: pointer;
        }

        /* Quick Export Modal Styles */
        .modal-content.quick-export-modal {
          max-width: 900px;
          max-height: 90vh;
        }

        .quick-export-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .export-shortcuts {
          margin-bottom: 24px;
        }

        .export-shortcuts h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .shortcuts-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .shortcut-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .shortcut-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
          transform: translateY(-2px);
        }

        .shortcut-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: white;
          margin-bottom: 12px;
        }

        .shortcut-content h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .shortcut-content p {
          font-size: 12px;
          color: #666666;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .shortcut-format {
          font-size: 10px;
          color: #9ca3af;
          background: #f8f9fa;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 500;
        }

        .export-presets {
          margin-bottom: 24px;
        }

        .export-presets h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .presets-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .preset-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .preset-info {
          flex: 1;
        }

        .preset-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .preset-info p {
          font-size: 12px;
          color: #666666;
          margin-bottom: 6px;
        }

        .preset-includes {
          font-size: 11px;
          color: #9ca3af;
          font-style: italic;
        }

        .preset-export-btn {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }

        .recent-exports h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .recent-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .recent-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: #f8f9fa;
          border-radius: 6px;
        }

        .recent-icon {
          font-size: 16px;
        }

        .recent-name {
          flex: 1;
          font-size: 13px;
          font-weight: 500;
          color: #1a1a1a;
        }

        .recent-time {
          font-size: 11px;
          color: #666666;
        }

        /* Share Modal Styles */
        .modal-content.share-modal {
          max-width: 800px;
          max-height: 90vh;
        }

        .share-content {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .share-options {
          margin-bottom: 24px;
        }

        .share-options h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .share-methods {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .share-option-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 16px;
        }

        .share-option-header {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
        }

        .share-icon {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: white;
        }

        .share-option-info {
          flex: 1;
        }

        .share-option-info h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .share-option-info p {
          font-size: 12px;
          color: #666666;
          line-height: 1.4;
        }

        .permission-selector {
          margin-bottom: 12px;
        }

        .permission-selector label {
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          display: block;
          margin-bottom: 4px;
        }

        .permission-selector select {
          width: 100%;
          padding: 6px 8px;
          border: 1px solid #e5e7eb;
          border-radius: 4px;
          font-size: 12px;
        }

        .share-action-btn {
          width: 100%;
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .quick-share {
          margin-bottom: 24px;
        }

        .quick-share h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .quick-share-form {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .share-input-group {
          margin-bottom: 16px;
        }

        .share-input-group label {
          font-size: 12px;
          font-weight: 600;
          color: #666666;
          display: block;
          margin-bottom: 8px;
        }

        .input-with-btn {
          display: flex;
          gap: 8px;
        }

        .share-email-input {
          flex: 2;
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
        }

        .permission-quick-select {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
        }

        .quick-invite-btn {
          background: linear-gradient(135deg, #22c55e, #16a34a);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .share-link-section {
          margin-bottom: 16px;
        }

        .link-generator {
          display: flex;
          gap: 8px;
          margin-bottom: 8px;
        }

        .share-link-input {
          flex: 1;
          padding: 8px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
          background: #ffffff;
        }

        .copy-link-btn {
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .link-options {
          display: flex;
          gap: 16px;
        }

        .link-options label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #666666;
          cursor: pointer;
        }

        .shared-access {
          margin-bottom: 24px;
        }

        .shared-access h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .access-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .access-item {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .access-user {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .access-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #10b981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
        }

        .access-info {
          flex: 1;
        }

        .access-name {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a1a;
        }

        .access-email {
          font-size: 11px;
          color: #666666;
        }

        .access-permission {
          font-size: 12px;
          font-weight: 600;
          color: #3b82f6;
          min-width: 60px;
        }

        .access-actions {
          display: flex;
          gap: 4px;
        }

        .access-action {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          cursor: pointer;
        }

        .access-action:hover {
          background: #e5e7eb;
        }

        .sharing-insights h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .insights-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .insight-stat {
          background: #f8f9fa;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
        }

        .insight-stat .stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a1a;
          margin-bottom: 4px;
        }

        .insight-stat .stat-label {
          font-size: 11px;
          color: #666666;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
};

export default HOUSEI_Dashboard;